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

export const bio =
  'Je suis Baye Amadou Thiam, polytechnicien, né et grandi à Joal-Fadiouth. Passionné par le service aux autres et l’engagement étudiant, j’ai toujours cru qu’un campus fort commence par des étudiants qui se lèvent. Aujourd’hui je me présente à la présidence du CEE, avec une méthode, une équipe, et un engagement total.';

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
  {
    period: '2020–2021',
    title: 'Président du Gouvernement Scolaire',
    place: 'Lycée Léopold Sédar Senghor de Joal',
  },
  {
    period: '2024–2026',
    title: 'Président de la Commission Culturelle',
    place: 'CEE — École Supérieure Polytechnique',
  },
  {
    period: 'En cours',
    title: 'Président du CLAC',
    place: 'Club de Littérature, d’Art et de Culture — ESP',
  },
  {
    period: '2025',
    title: 'Coordonnateur Général',
    place: 'Comité Reine des Grandes Écoles — ESP',
  },
  {
    period: 'En cours',
    title: 'Président de la Commission Sportive & Culturelle',
    place: 'AGEIS — Association des Grandes Écoles et Instituts du Sénégal',
  },
  {
    period: 'En cours',
    title: 'Responsable Pôle Leadership & Gestion de Projet',
    place: 'Club PolyLeader — ESP',
  },
  {
    period: 'En cours',
    title: 'Responsable Relations Extérieures',
    place: 'Club Anglais — ESP',
  },
];
