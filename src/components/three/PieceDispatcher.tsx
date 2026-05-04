import { GLBPiece } from '@/lib/chess-pieces/GLBPiece';
import type { PieceKind } from '@/data/axes';
import type { ChessPieceProps } from '@/lib/chess-pieces/PieceBase';

export const PieceDispatcher = ({
  kind,
  ...props
}: { kind: PieceKind } & ChessPieceProps) => {
  return <GLBPiece kind={kind} {...props} />;
};
