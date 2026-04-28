export type ParcoursItem = {
  date: string;
  title: string;
  place: string;
  ongoing?: boolean;
};

export type PosteItem = {
  period: string;
  title: string;
  place: string;
};

export const formation: ParcoursItem[] = [
  {
    date: '—',
    title: 'Baccalauréat',
    place: 'Lycée Malick Sy de Thiès',
  },
  {
    date: '—',
    title: 'Technicien Supérieur en Télécommunications & Réseaux',
    place: 'École Supérieure Polytechnique',
  },
  {
    date: 'En cours',
    title: 'Élève Ingénieur en Informatique, option Télécoms & Réseaux',
    place: 'École Supérieure Polytechnique',
    ongoing: true,
  },
];

export const postes: PosteItem[] = [
  {
    period: '2017–2018',
    title: 'Président du Gouvernement Scolaire',
    place: 'CEM 3 de Joal',
  },
  {
    period: '2018–2019',
    title: 'Président du Gouvernement Scolaire',
    place: 'CEM 3 de Joal',
  },
  // TODO: postes 3+ à fournir par l'utilisateur
];
