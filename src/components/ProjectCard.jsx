import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageCarousel from './ImageCarousel';
import { getProjectText, getProjectCaptions, projectPath } from '../data/projects';

// Carte de projet entièrement cliquable :
// - le titre est un vrai lien (clavier, lecteurs d'écran, clic droit, ouverture dans un nouvel onglet)
//   dont la zone est étendue à tout le corps de la carte (voir .projet-card__stretched dans global.css)
// - un clic sur la photo (ou le carrousel) ouvre aussi la page du projet
// - les flèches et points du carrousel restent utilisables sans déclencher la navigation
// variant "home" : localisation, année et surface sur une ligne ; "list" : deux lignes
export default function ProjectCard({ project, variant = 'list' }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const text = getProjectText(t, project);
  const path = projectPath(project);
  const captions = getProjectCaptions(t, project, 'captionsShort');

  return (
    <article className="projet-card projet-card--clickable" id={project.slug}>
      <div className="projet-card__img">
        {project.images ? (
          <ImageCarousel
            images={project.images.map((src, i) => ({ src, caption: captions[i] }))}
            title={text.title}
            height={200}
            showNav
            autoplay
            imageCursor="pointer"
            onImageClick={() => navigate(path)}
          />
        ) : (
          <Link to={path} tabIndex={-1} aria-hidden="true">
            <img src={project.fallbackImage} alt="" loading="lazy" />
          </Link>
        )}
      </div>
      <div className="projet-card__body">
        <span className="projet-card__tag">{text.category}</span>
        <h3 className="projet-card__title">
          <Link to={path} className="projet-card__stretched">{text.title}</Link>
        </h3>
        {variant === 'home' ? (
          <p className="projet-card__location">📍 {text.location} · 📅 {project.year} · {text.surface}</p>
        ) : (
          <>
            <p className="projet-card__location">📍 {text.location}</p>
            <p className="projet-card__location" style={{ color: 'var(--text-faint)' }}>📅 {project.year} · {text.surface}</p>
          </>
        )}
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: variant === 'home' ? undefined : 300 }}>
          {variant === 'home' ? text.excerptHome : text.excerpt}
        </p>
        <span className="projet-card__link" aria-hidden="true">{text.learnMore}</span>
      </div>
    </article>
  );
}
