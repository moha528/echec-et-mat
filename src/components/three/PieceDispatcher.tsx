import { King } from '@/lib/chess-pieces/King';
import { Queen } from '@/lib/chess-pieces/Queen';
import { Rook } from '@/lib/chess-pieces/Rook';
import { Bishop } from '@/lib/chess-pieces/Bishop';
import { Knight } from '@/lib/chess-pieces/Knight';
import { Sigma } from '@/lib/chess-pieces/Sigma';
import type { PieceKind } from '@/data/axes';
import type { ChessPieceProps } from '@/lib/chess-pieces/PieceBase';

export const PieceDispatcher = ({
  kind,
  ...props
}: { kind: PieceKind } & ChessPieceProps) => {
  switch (kind) {
    case 'king':
      return <King {...props} />;
    case 'queen':
      return <Queen {...props} />;
    case 'rook':
      return <Rook {...props} />;
    case 'bishop':
      return <Bishop {...props} />;
    case 'knight':
      return <Knight {...props} />;
    case 'sigma':
      return <Sigma {...props} />;
  }
};
