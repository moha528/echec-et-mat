// Convert STL pieces (head + body) into compressed GLB models.
// Each piece is independently re-oriented to Y-up (since print STLs are often
// laid on their side), head is stacked atop body, then merged + simplified.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Document, NodeIO } from '@gltf-transform/core';
import { KHRDracoMeshCompression } from '@gltf-transform/extensions';
import { dedup, weld, simplify } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';
import draco3d from 'draco3dgltf';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STL_DIR = resolve(__dirname, '..', 'tmp', 'stl');
const OUT_DIR = resolve(__dirname, '..', 'public', 'models');
mkdirSync(OUT_DIR, { recursive: true });

// Per-piece overrides: bodyAxis/headAxis force the source-axis interpreted as
// "up" (default = auto-detect via longest bounding-box dimension).
// flipBody/flipHead flip vertically after the axis swap, useful when the
// auto base-down/neck-down heuristic guesses wrong.
const PIECES = [
  { name: 'king', body: 'king-body.stl', head: 'king-head.stl' },
  { name: 'queen', body: 'queen-body.stl', head: 'queen-head.stl' },
  { name: 'bishop', body: 'bishop-body.stl', head: 'bishop-head.stl' },
  // Knight head is a horse profile — no rotational symmetry, so symmetry
  // detection is unreliable. Force Y-up and skip the neck-down heuristic.
  { name: 'knight', body: 'knight-body.stl', head: 'knight-head-new.stl', headAxis: 'y', skipNeckCheck: true },
  { name: 'rook', body: 'rook-body.stl', head: 'rook-head.stl' },
  { name: 'pawn', body: 'pawn-body.stl', head: 'pawn-head.stl' },
];

function parseBinarySTL(buffer) {
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const triangleCount = view.getUint32(80, true);
  const positions = new Float32Array(triangleCount * 9);
  let offset = 84;
  for (let i = 0; i < triangleCount; i++) {
    offset += 12;
    for (let v = 0; v < 9; v++) {
      positions[i * 9 + v] = view.getFloat32(offset, true);
      offset += 4;
    }
    offset += 2;
  }
  return positions;
}

function computeBounds(positions) {
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i], y = positions[i + 1], z = positions[i + 2];
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
  }
  return { minX, minY, minZ, maxX, maxY, maxZ };
}

function transformInPlace(positions, fn) {
  for (let i = 0; i < positions.length; i += 3) {
    const out = fn(positions[i], positions[i + 1], positions[i + 2]);
    positions[i] = out[0];
    positions[i + 1] = out[1];
    positions[i + 2] = out[2];
  }
}

function concat(a, b) {
  const out = new Float32Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

function computeFlatNormals(positions) {
  const normals = new Float32Array(positions.length);
  for (let i = 0; i < positions.length; i += 9) {
    const ax = positions[i], ay = positions[i + 1], az = positions[i + 2];
    const bx = positions[i + 3], by = positions[i + 4], bz = positions[i + 5];
    const cx = positions[i + 6], cy = positions[i + 7], cz = positions[i + 8];
    const ux = bx - ax, uy = by - ay, uz = bz - az;
    const vx = cx - ax, vy = cy - ay, vz = cz - az;
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len; ny /= len; nz /= len;
    for (let j = 0; j < 3; j++) {
      normals[i + j * 3] = nx;
      normals[i + j * 3 + 1] = ny;
      normals[i + j * 3 + 2] = nz;
    }
  }
  return normals;
}

// Pick the axis ('x'|'y'|'z') perpendicular to the two most-equal dimensions —
// chess pieces are rotationally symmetric around their vertical axis, so the
// "odd one out" axis is the height (works even for squat pieces like rook).
function pickHeightAxis(b) {
  const dx = b.maxX - b.minX;
  const dy = b.maxY - b.minY;
  const dz = b.maxZ - b.minZ;
  const rXY = Math.abs(dx - dy) / Math.max(dx, dy);
  const rXZ = Math.abs(dx - dz) / Math.max(dx, dz);
  const rYZ = Math.abs(dy - dz) / Math.max(dy, dz);
  if (rXY <= rXZ && rXY <= rYZ) return 'z';
  if (rXZ <= rXY && rXZ <= rYZ) return 'y';
  return 'x';
}

// Rotate so the chosen axis becomes Y. Keeps right-handedness.
function swapAxisToY(positions, axis) {
  if (axis === 'y') return;
  if (axis === 'x') {
    // X→Y, Y→-X — rotation +90° around Z
    transformInPlace(positions, (x, y, z) => [-y, x, z]);
  } else if (axis === 'z') {
    // Z→Y, Y→-Z — rotation -90° around X
    transformInPlace(positions, (x, y, z) => [x, z, -y]);
  }
}

// Compute the max XZ-radius within the slab y ∈ [yLo, yHi].
function maxRadiusInSlab(positions, yLo, yHi, cx, cz) {
  let maxR = 0;
  for (let i = 0; i < positions.length; i += 3) {
    const y = positions[i + 1];
    if (y < yLo || y > yHi) continue;
    const dx = positions[i] - cx;
    const dz = positions[i + 2] - cz;
    const r = Math.hypot(dx, dz);
    if (r > maxR) maxR = r;
  }
  return maxR;
}

// Flip Y so the wider end (chess piece base) is at minY.
function ensureBaseDown(positions) {
  const b = computeBounds(positions);
  const cx = (b.minX + b.maxX) / 2;
  const cz = (b.minZ + b.maxZ) / 2;
  const slab = (b.maxY - b.minY) * 0.12;
  const rBottom = maxRadiusInSlab(positions, b.minY, b.minY + slab, cx, cz);
  const rTop = maxRadiusInSlab(positions, b.maxY - slab, b.maxY, cx, cz);
  if (rTop > rBottom * 1.05) {
    transformInPlace(positions, (x, y, z) => [x, -y, z]);
  }
}

// Flip Y so the narrower end (head's neck/peg) is at minY.
function ensureNeckDown(positions) {
  const b = computeBounds(positions);
  const cx = (b.minX + b.maxX) / 2;
  const cz = (b.minZ + b.maxZ) / 2;
  const slab = (b.maxY - b.minY) * 0.12;
  const rBottom = maxRadiusInSlab(positions, b.minY, b.minY + slab, cx, cz);
  const rTop = maxRadiusInSlab(positions, b.maxY - slab, b.maxY, cx, cz);
  if (rBottom > rTop * 1.05) {
    transformInPlace(positions, (x, y, z) => [x, -y, z]);
  }
}

const TARGET_KING_HEIGHT = 1.7;

const io = new NodeIO()
  .registerExtensions([KHRDracoMeshCompression])
  .registerDependencies({
    'draco3d.encoder': await draco3d.createEncoderModule(),
    'draco3d.decoder': await draco3d.createDecoderModule(),
  });

// First pass: determine each piece's full assembled height in source units to
// derive a uniform scale (king sets the reference).
const processed = [];
for (const p of PIECES) {
  let body = parseBinarySTL(readFileSync(resolve(STL_DIR, p.body)));
  let head = parseBinarySTL(readFileSync(resolve(STL_DIR, p.head)));

  const bodyBoundsRaw = computeBounds(body);
  const bodyAxis = p.bodyAxis ?? pickHeightAxis(bodyBoundsRaw);
  swapAxisToY(body, bodyAxis);
  if (p.flipBody) transformInPlace(body, (x, y, z) => [x, -y, z]);
  else ensureBaseDown(body);

  const headBoundsRaw = computeBounds(head);
  const headAxis = p.headAxis ?? pickHeightAxis(headBoundsRaw);
  swapAxisToY(head, headAxis);
  if (p.flipHead) transformInPlace(head, (x, y, z) => [x, -y, z]);
  else if (p.skipNeckCheck !== true) ensureNeckDown(head);

  const dxs = [
    `${(bodyBoundsRaw.maxX - bodyBoundsRaw.minX).toFixed(1)}`,
    `${(bodyBoundsRaw.maxY - bodyBoundsRaw.minY).toFixed(1)}`,
    `${(bodyBoundsRaw.maxZ - bodyBoundsRaw.minZ).toFixed(1)}`,
  ];
  const hdxs = [
    `${(headBoundsRaw.maxX - headBoundsRaw.minX).toFixed(1)}`,
    `${(headBoundsRaw.maxY - headBoundsRaw.minY).toFixed(1)}`,
    `${(headBoundsRaw.maxZ - headBoundsRaw.minZ).toFixed(1)}`,
  ];
  console.log(`  ${p.name}: body axis=${bodyAxis} dims=${dxs.join('×')} | head axis=${headAxis} dims=${hdxs.join('×')}`);

  // Center body on XZ, sit on Y=0.
  const bb = computeBounds(body);
  const cx = (bb.minX + bb.maxX) / 2;
  const cz = (bb.minZ + bb.maxZ) / 2;
  transformInPlace(body, (x, y, z) => [x - cx, y - bb.minY, z - cz]);

  // Place head: align XZ centers, head.minY = body.maxY.
  const bb2 = computeBounds(body);
  const hb = computeBounds(head);
  const hcx = (hb.minX + hb.maxX) / 2;
  const hcz = (hb.minZ + hb.maxZ) / 2;
  transformInPlace(head, (x, y, z) => [
    x - hcx,
    y - hb.minY + bb2.maxY,
    z - hcz,
  ]);

  processed.push({ ...p, body, head });
}

const kingFull = concat(
  processed.find((p) => p.name === 'king').body,
  processed.find((p) => p.name === 'king').head,
);
const kingBounds = computeBounds(kingFull);
const kingHeight = kingBounds.maxY - kingBounds.minY;
const SCALE = TARGET_KING_HEIGHT / kingHeight;
console.log(`Reference king height = ${kingHeight.toFixed(2)} → scale ${SCALE.toFixed(5)}`);

for (const p of processed) {
  let positions = concat(p.body, p.head);
  transformInPlace(positions, (x, y, z) => [x * SCALE, y * SCALE, z * SCALE]);
  const normals = computeFlatNormals(positions);

  const doc = new Document();
  doc.createBuffer();
  const posAcc = doc.createAccessor().setArray(positions).setType('VEC3');
  const normAcc = doc.createAccessor().setArray(normals).setType('VEC3');
  const mat = doc.createMaterial(`${p.name}_mat`)
    .setBaseColorFactor([0.96, 0.9, 0.78, 1])
    .setRoughnessFactor(0.45)
    .setMetallicFactor(0.05);
  const prim = doc.createPrimitive()
    .setAttribute('POSITION', posAcc)
    .setAttribute('NORMAL', normAcc)
    .setMaterial(mat);
  const mesh = doc.createMesh(p.name).addPrimitive(prim);
  const node = doc.createNode(p.name).setMesh(mesh);
  doc.createScene().addChild(node);

  await doc.transform(
    weld({ tolerance: 0.0001 }),
    dedup(),
    simplify({
      simplifier: MeshoptSimplifier,
      ratio: p.name === 'knight' ? 0.04 : 0.08,
      error: 0.001,
      lockBorder: true,
    }),
  );

  doc.createExtension(KHRDracoMeshCompression)
    .setRequired(true)
    .setEncoderOptions({
      method: KHRDracoMeshCompression.EncoderMethod.EDGEBREAKER,
      encodeSpeed: 5,
      decodeSpeed: 5,
    });

  const glb = await io.writeBinary(doc);
  const outPath = resolve(OUT_DIR, `${p.name}.glb`);
  writeFileSync(outPath, glb);
  const tris = positions.length / 9;
  console.log(`${p.name}: ${(glb.byteLength / 1024).toFixed(1)} KB (~${tris.toFixed(0)} triangles before simplify)`);
}

console.log('\nDone.');
