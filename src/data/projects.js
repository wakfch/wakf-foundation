// Source unique des 5 projets de la Fondation.
// Les textes (titre, catégorie, localisation, surface, descriptions, légendes) sont traduits
// dans src/locales/*.json sous projects.items.<id>. Ce fichier contient le reste :
// l'identifiant, l'URL, l'année, le statut et les images.
import { IMAGE_SRCS } from './projectImages';

export const PROJECTS = [
  {
    id: 'madretsch',
    slug: 'mosquee-madretsch',
    legacySlugs: ['madretsch'],
    year: '2009',
    status: 'termine',
    featured: true,
    images: IMAGE_SRCS.madretsch,
    fallbackImage: 'https://picsum.photos/600/320?grayscale&random=1',
    heroImage: 'https://picsum.photos/1200/500?grayscale&random=1',
  },
  {
    id: 'aliman',
    slug: 'centre-al-iman',
    legacySlugs: ['aliman'],
    year: '2018',
    status: 'en-cours',
    featured: true,
    images: IMAGE_SRCS.aliman,
    heroImage: 'https://picsum.photos/1200/500?grayscale&random=2',
  },
  {
    id: 'albadr',
    slug: 'centre-al-badr',
    legacySlugs: ['albadr'],
    year: '2017',
    status: 'en-cours',
    featured: true,
    images: IMAGE_SRCS.albadr,
    fallbackImage: 'https://picsum.photos/600/320?grayscale&random=3',
    heroImage: 'https://picsum.photos/1200/500?grayscale&random=3',
  },
  {
    id: 'annour',
    slug: 'mosquee-an-nour',
    legacySlugs: ['annour'],
    year: '2024',
    status: 'en-cours',
    fallbackImage: 'https://picsum.photos/600/320?grayscale&random=4',
    heroImage: 'https://picsum.photos/1200/500?grayscale&random=4',
  },
  {
    id: 'bibliotheque',
    slug: 'bibliotheque-mobile',
    legacySlugs: [],
    year: '2023',
    status: 'en-cours',
    fallbackImage: 'https://picsum.photos/600/320?grayscale&random=5',
    heroImage: 'https://picsum.photos/1200/500?grayscale&random=5',
  },
];

export const projectPath = (project) => `/projets/${project.slug}`;

// Retrouve un projet par son URL actuelle ou par un ancien slug (anciens liens et favoris)
export const findProjectBySlug = (slug) =>
  PROJECTS.find((p) => p.slug === slug || p.legacySlugs.includes(slug));

// Textes d'un projet dans la langue courante
export const getProjectText = (t, project) => {
  const k = (field) => `projects.items.${project.id}.${field}`;
  return {
    title: t(k('title')),
    category: t(k('type')),
    location: t(k('ville')),
    surface: t(k('surface')),
    excerpt: t(k('excerpt')),
    excerptHome: t(k('excerptHome'), { defaultValue: t(k('excerpt')) }),
    learnMore: t('common.learnMore'),
  };
};

export const getProjectCaptions = (t, project, field = 'captions') =>
  project.images ? t(`projects.items.${project.id}.${field}`, { returnObjects: true }) : [];
