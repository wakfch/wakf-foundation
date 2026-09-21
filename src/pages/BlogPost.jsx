import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePost } from '../hooks/useWordPress';

// Textes traduits dans src/locales/*.json (blog.posts.<slug>)
const STATIC = {
  'inauguration-centre-cultuel': { tagKey: 'centre', img: 10 },
  'rapport-annuel-2025': { tagKey: 'report', img: 12 },
};

const DATE_LOCALES = { fr: 'fr-CH', de: 'de-CH', en: 'en-GB', ar: 'ar-u-nu-latn' };

export default function BlogPost() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const { data: wpPost, isLoading, isError } = usePost(slug);
  const dateLocale = DATE_LOCALES[(i18n.language || 'fr').slice(0, 2)] || 'fr-CH';

  const staticPost = STATIC[slug]
    ? {
        tag: t(`blog.tags.${STATIC[slug].tagKey}`),
        date: t(`blog.posts.${slug}.date`),
        title: t(`blog.posts.${slug}.title`),
        content: t(`blog.posts.${slug}.content`),
        img: STATIC[slug].img,
      }
    : undefined;

  const post = !isLoading && !isError && wpPost
    ? {
        tag: wpPost._embedded?.['wp:term']?.[1]?.[0]?.name || t('blog.defaultTag'),
        date: new Date(wpPost.date).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }),
        title: wpPost.title.rendered,
        content: wpPost.content.rendered,
        img: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      }
    : staticPost;

  if (isLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--nav-h)' }}>
        <p style={{ color: 'var(--text-muted)' }}>{t('common.loading')}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--space-4)', paddingTop: 'var(--nav-h)' }}>
        <p style={{ fontSize: 18, color: 'var(--text-muted)' }}>{t('blog.notFound')}</p>
        <Link to="/blog" className="btn btn--outline">{t('blog.back')}</Link>
      </div>
    );
  }

  return (
    <>
      <div data-page-hero style={{
        height: 360, background: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.3)), url(${post.img || `https://picsum.photos/1200/400?grayscale&random=${slug}`}) center/cover`,
        display: 'flex', alignItems: 'flex-end', paddingTop: 'var(--nav-h)',
      }}>
        <div className="container" style={{ paddingBottom: 'var(--space-10)' }}>
          <span className="badge badge--gold" style={{ marginBottom: 'var(--space-3)', display: 'inline-block' }}>{post.tag}</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: 'var(--white)', lineHeight: 1.2, maxWidth: 700 }}>{post.title}</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginTop: 'var(--space-3)' }}>{post.date}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item"><Link to="/blog">{t('blog.breadcrumb')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{post.title.slice(0, 40)}…</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div style={{ maxWidth: 760, marginInline: 'auto', padding: '0 var(--space-6)' }}>
            <div style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.85, fontWeight: 300 }}
              dangerouslySetInnerHTML={{ __html: post.content }} />

            <div style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <Link to="/blog" className="btn btn--outline btn--sm">{t('blog.back')}</Link>
              <Link to="/don" className="btn btn--primary btn--sm">{t('blog.support')}</Link>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .section h2, .section h3 { font-family: var(--font-heading); color: var(--text-heading); margin: var(--space-8) 0 var(--space-4); }
        .section h2 { font-size: 22px; }
        .section h3 { font-size: 18px; }
        .section p { margin-bottom: var(--space-4); }
        .section ul, .section ol { padding-left: var(--space-6); margin-bottom: var(--space-4); }
        .section li { margin-bottom: var(--space-2); font-size: 15px; color: var(--text-muted); }
        .section a { color: var(--green); }
      `}</style>
    </>
  );
}
