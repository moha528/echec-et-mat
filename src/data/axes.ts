export type PieceKind =
  | 'king'
  | 'queen'
  | 'rook'
  | 'bishop'
  | 'knight'
  | 'sigma';

export type GroupIcon =
  | 'bolt'
  | 'magnifier'
  | 'shield'
  | 'flame'
  | 'compass'
  | 'crown';

export type AxeGroup = {
  title: string;
  icon: GroupIcon;
  items: string[];
};

export type Axe = {
  id: string;
  number: string;
  piece: PieceKind;
  pieceLabel: string;
  title: string;
  position: [number, number];
  highlight?: boolean;
  groups: AxeGroup[];
};

export const axes: Axe[] = [
  {
    id: 'le-roi',
    number: '01',
    piece: 'king',
    pieceLabel: 'Le Roi',
    title: 'Social',
    position: [4, 0],
    highlight: true,
    groups: [
      // TODO: contenu Social à fournir par l'utilisateur — placeholder
      {
        title: 'Bien-être',
        icon: 'shield',
        items: ['// TODO: contenu Social — engagements à fournir'],
      },
    ],
  },
  {
    id: 'la-reine',
    number: '02',
    piece: 'queen',
    pieceLabel: 'La Reine',
    title: 'Communication',
    position: [3, 3],
    groups: [
      {
        title: 'Rigueur',
        icon: 'bolt',
        items: [
          "Recentrer la communication de l'école autour du CEE",
          'Promouvoir le POLY-MARKET pour désengorger le canal INFOS-ESP',
          'Renforcer la collaboration entre le CEE et le club Presse',
          'Journée des clubs : meilleure coordination entre les clubs et structures départementales',
        ],
      },
      {
        title: 'Transparence',
        icon: 'magnifier',
        items: [
          // TODO: contenu Transparence à fournir par l'utilisateur
          '// TODO: contenu Transparence — engagements à fournir',
        ],
      },
    ],
  },
  {
    id: 'la-tour',
    number: '03',
    piece: 'rook',
    pieceLabel: 'La Tour',
    title: 'Pédagogie & IT',
    position: [7, 0],
    groups: [
      // TODO: contenu Pédagogie & IT à fournir par l'utilisateur
      {
        title: 'Outils',
        icon: 'compass',
        items: ['// TODO: contenu Pédagogie & IT — engagements à fournir'],
      },
    ],
  },
  {
    id: 'le-fou',
    number: '04',
    piece: 'bishop',
    pieceLabel: 'Le Fou',
    title: 'Sport & Culture',
    position: [2, 7],
    groups: [
      // TODO: contenu Sport & Culture à fournir par l'utilisateur
      {
        title: 'Élan',
        icon: 'flame',
        items: ['// TODO: contenu Sport & Culture — engagements à fournir'],
      },
    ],
  },
  {
    id: 'le-cavalier',
    number: '05',
    piece: 'knight',
    pieceLabel: 'Le Cavalier',
    title: 'Relations Extérieures',
    position: [5, 2],
    groups: [
      // TODO: contenu Relations Extérieures à fournir par l'utilisateur
      {
        title: 'Ouverture',
        icon: 'compass',
        items: ['// TODO: contenu Relations Extérieures — engagements à fournir'],
      },
    ],
  },
  {
    id: 'les-maths',
    number: '06',
    piece: 'sigma',
    pieceLabel: 'Sigma',
    title: 'Organisation & Finance',
    position: [1, 5],
    groups: [
      // TODO: contenu Maths du Succès à fournir par l'utilisateur
      {
        title: 'Méthode',
        icon: 'crown',
        items: ['// TODO: contenu Organisation & Finance — engagements à fournir'],
      },
    ],
  },
];

export const findAxe = (id: string) => axes.find((a) => a.id === id);
export const axeIndex = (id: string) => axes.findIndex((a) => a.id === id);
