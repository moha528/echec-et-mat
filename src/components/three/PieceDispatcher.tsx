import { GLBPiece } from '@/lib/chess-pieces/GLBPiece';
import type { PieceKind } from '@/data/axes';
import type { ChessPieceProps } from '@/lib/chess-pieces/PieceBase';

export const PieceDispatcher = ({
  kind,
  normalize,
  ...props
}: { kind: PieceKind; normalize?: boolean } & ChessPieceProps) => {
  return <GLBPiece kind={kind} normalize={normalize} {...props} />;
};
