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
      {
        title: 'Logement & vie sociale',
        icon: 'shield',
        items: [
          'Garantir à tous les ayants droit une codification dans une chambre',
          'Aligner les chambres des polytechniciennes au pavillon H',
          'Codifier à 3 personnes (pavillons A, B, C) et à 7 max au pavillon G',
          'Comité de contrôle (Président, PCS, SG, ACS) contre l’hébergement illégal',
          'Campagnes de désinsectisation et de désinfection',
          'Remplacer les serrures des portes et des armoires',
          'Traiter les problèmes de moisissure (Ex : 59G)',
          'Augmenter le nombre de tables et de chaises dans les chambres',
          'Élire deux chefs de couloir au lieu d’un',
          'Augmenter le nombre de boxes Wi-Fi',
          'Installer davantage de poubelles avec sacs',
          'Réparer et sécuriser les distributeurs automatiques de savon',
          'Donner accès aux chefs de couloir aux armoires techniques',
          'Fournir une boîte médicale de premiers secours par couloir',
          'Rénover les toilettes (serrures, robinets, évacuations)',
          'Assurer le suivi du redéploiement progressif du pavillon H',
          'Engager les démarches pour récupérer le rez-de-chaussée du pavillon G',
          'Décaler l’heure de nettoyage à 9 h dans les pavillons',
          'Organiser des journées environnementales (Set Setal, recyclage artistique)',
          'Installer un nouveau kaaynaan entre les pavillons A et C',
          'Réparer le drapeau, les bancs publics et les poubelles défectueux',
          'Installer une table de ping-pong dans un carré Neexal',
          'Aménager un espace MAU',
        ],
      },
      {
        title: 'Sécurité & santé',
        icon: 'shield',
        items: [
          'Renforcer les dispositifs de sécurité à l’entrée du campus',
          'Relancer la mise en service des caméras de surveillance (DISI)',
          'Promouvoir et agrandir SOS étudiant — cellule des mœurs et d’intervention d’urgence',
          'Distribuer des serviettes hygiéniques (en collaboration avec Monica)',
          'Multiplier les formations aux premiers secours',
          'Renforcer le service médical',
          'Sensibiliser à l’importance des dossiers médicaux',
          'Organiser des journées médicales et des collectes de sang (club humanitaire)',
        ],
      },
      {
        title: 'Restauration & bourse',
        icon: 'flame',
        items: [
          'Réclamer l’amélioration de la qualité des repas du restaurant',
          'Mettre en place des contrôles hebdomadaires et improvisés',
          'Augmenter la fréquence des repas améliorés',
          'Offrir des tickets restaurant',
          'Mettre en place un Food-truck étudiant (géré par MASS)',
          'Reprendre les démarches pour amener neex soow, paa lakh, tangana',
          'Démarcher un point de retrait sans frais abusifs',
          'Améliorer la QoS du multiservices (Monnaie)',
        ],
      },
      {
        title: 'Problème de l’eau',
        icon: 'compass',
        items: [
          'Réparer les installations défectueuses (robinets, lavabos, plomberies)',
          'Installer des barils avec couvercle et robinet pour la conservation',
          'Sensibiliser à la gestion responsable et intelligente de l’eau',
          'Augmenter les rotations d’approvisionnement en eau',
          'Réengager des négociations pour une solution durable',
          'Distribution de bidons de 10 L dans les chambres',
          'Extension du projet Kaaynaan entre le pavillon A et le pavillon C',
        ],
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
          'Recentrer la communication de l’école autour du CEE',
          'Promouvoir le POLY-MARKET pour désengorger le canal INFOS-ESP',
          'Renforcer la collaboration entre le CEE et le club Presse',
          'Journée des clubs : meilleure coordination entre clubs et structures départementales',
        ],
      },
      {
        title: 'Transparence',
        icon: 'magnifier',
        items: [
          'Promouvoir une culture de transparence et de vérité dans la communication institutionnelle',
          'Mettre en place une communication régulière sur les actions et décisions du CEE',
          'Publier des bilans trimestriels du CEE accessibles à tous les étudiants',
        ],
      },
      {
        title: 'Information',
        icon: 'compass',
        items: [
          'Assurer la bonne gestion des réseaux sociaux',
          'Créer un compte LinkedIn officiel du CEE',
          'Améliorer la visibilité des projets étudiants et équipes de compétition',
          'Informer sur le règlement intérieur du campus de manière claire et accessible',
          'Expérience alumni structurée : témoignages, retours d’expérience, mentorat',
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
      {
        title: 'Excellence académique',
        icon: 'crown',
        items: [
          'Organiser des compétitions : Génie en herbe, éloquence, débattons',
          'Master-class pratiques avec le club PolyLeader : CV, entretiens, développement personnel',
          'Démarcher l’inclusion de certifications et habilitations dans le programme d’études',
          'Mettre en place une journée de l’excellence pour valoriser les meilleurs étudiants',
          'Mettre en place un système de tutorat structuré entre étudiants',
        ],
      },
      {
        title: 'Digital & innovation',
        icon: 'bolt',
        items: [
          'Obtenir un espace dédié sur esp.sn pour valoriser les grandes réalisations étudiantes',
          'Plateforme polytechnicienne centralisant : khints, guide commission sociale, opportunités, boîtes à idées',
          'Démarcher la digitalisation des paiements COUD',
          'Engager des discussions pour rééquilibrer les quotas dans les départements',
        ],
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
      {
        title: 'Sport',
        icon: 'flame',
        items: [
          'Pérenniser la collaboration avec NICOMATIC (salle de sport)',
          'Rénover la salle en acquérant du matériel de meilleure qualité',
          'Recruter un coach pour encadrer les activités',
          'Système de gestion efficace : tickets d’accès et contrôles aléatoires',
          'Installer des projecteurs sur les terrains de basket et de football',
          'Réparer les cerceaux du terrain et les bancs',
          'Acquérir des poteaux amovibles et filets pour le volley-ball',
          'Mettre en place un parcours sportif derrière les boutiques',
          'Aménager des espaces pour des olympiades (relais, sauts, vitesse)',
          'Organiser des matchs intergénérationnels',
          'Tournois intra et inter-départementaux',
          'Acheter du matériel pour la commission sportive (ballons, dossards…)',
          'Collaborer avec SamaCoach pour des réductions et la sensibilisation',
          'Encourager une plus grande participation des filles',
          'Collaborer avec l’INSEPS pour la mise en relation avec un club de natation',
        ],
      },
      {
        title: 'Culture',
        icon: 'crown',
        items: [
          'Démarcher la mise en place d’un fan zone fixe auprès du DACS',
          'Ateliers d’art ouverts à tous en collaboration avec le CLAC',
          'Élection annuelle de la Reine, Miss et Mister ESP',
          'Collaborer avec OhGallery et LomanArt',
          'Soirées jeux, cinéma plein air, temps boy, jersey day, soirée années 60',
          'Renforcer les liens entre le CEE et les structures religieuses',
          'Relancer la chorale polytechnicienne',
          'Contribuer à l’achèvement de la mosquée de l’ESP',
        ],
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
      {
        title: 'Partenariats & ouverture',
        icon: 'compass',
        items: [
          'Promouvoir le statut d’étudiant-entrepreneur',
          '« Un étudiant, un permis de conduire » avec des auto-écoles et le BPG',
          'Initier des caravanes de rentrée dans les régions avec SOS ÉTUDIANT',
          'Raffermir les collaborations avec le réseau des alumni',
          'Mettre en place une cellule de veille et de bonnes mœurs',
          'Tisser des liens avec les autres écoles à travers BRIDGE-AGEIS',
          'Partenariats pour les structures entrepreneuriales (ENACTUS ESP…)',
          'Œuvrer à la mise en place d’un accompagnement psychologique sur le campus',
          'Piloter les démarches de collaboration avec les partenaires',
        ],
      },
    ],
  },
  {
    id: 'les-maths',
    number: '06',
    piece: 'sigma',
    pieceLabel: 'Les Maths du Succès',
    title: 'Organisation & Finance',
    position: [1, 5],
    groups: [
      {
        title: 'Organisation & finance',
        icon: 'crown',
        items: [
          'Sessions de formation en éducation financière avec le club Finance',
          'Foire polytechnicienne (ngoontal, expo-vente, alumni, retrouvailles) min. 2 ×/an',
          'Réaménager la salle télé pour en faire un espace fonctionnel',
          'Événements fédérateurs (kermesses, barbecues…)',
          'Rénover la case du CEE',
          'Acquérir une sonorisation pour le campus',
          'Cellule entrepreneuriale du CEE : incubation, mise en relation, formations PolyLeader',
          'Organiser la grande excursion polytechnicienne',
        ],
      },
      {
        title: 'Intégrations',
        icon: 'bolt',
        items: [
          'Veiller à une bonne organisation des intégrations départementales et communales (comité mam)',
          'Collaborer avec le DACS pour les autorisations des activités culturelles',
          'Participation active et transparente au financement des intégrations',
          'Journée d’intégration pour les nouveaux étudiants venant du privé',
          'Tournées trimestrielles de chambres entre le CEE et les étudiants',
          'Intégrations de couloir pour renforcer les liens entre polytechniciens',
          'Renforcer les négociations avec le SAF pour l’organisation des intégrations',
          'Assemblée générale pour réformer le système d’intégration',
          'Impliquer les étudiants dans les projets d’aménagement',
        ],
      },
    ],
  },
];

export const findAxe = (id: string) => axes.find((a) => a.id === id);
export const axeIndex = (id: string) => axes.findIndex((a) => a.id === id);
