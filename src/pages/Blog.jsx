import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePosts } from '../hooks/useWordPress';

// Textes traduits dans src/locales/*.json (blog.posts.<slug>, blog.tags.<tagKey>)
const STATIC_POSTS = [
  { id: 1, slug: 'inauguration-centre-cultuel', tagKey: 'centre', img: 10 },
  { id: 2, slug: 'bourses-2026', tagKey: 'education', img: 11 },
  { id: 3, slug: 'rapport-annuel-2025', tagKey: 'report', img: 12 },
  { id: 4, slug: 'zakat-al-mal', tagKey: 'zakat', img: 13 },
  { id: 5, slug: 'partenariat-islamic-relief', tagKey: 'partnership', img: 14 },
  { id: 6, slug: 'carre-musulman-berne', tagKey: 'cemetery', img: 15 },
];

const DATE_LOCALES = { fr: 'fr-CH', de: 'de-CH', en: 'en-GB', ar: 'ar-u-nu-latn' };

export default function Blog() {
  const { t, i18n } = useTranslation();
  const { data: wpPosts, isLoading, isError } = usePosts();
  const [tag, setTag] = useState('all');
  const dateLocale = DATE_LOCALES[(i18n.language || 'fr').slice(0, 2)] || 'fr-CH';

  const tagLabel = (key) => t(`blog.tags.${key}`, { defaultValue: key });

  const posts = (!isLoading && !isError && wpPosts && wpPosts.length > 0)
    ? wpPosts.map(p => {
        const name = p._embedded?.['wp:term']?.[1]?.[0]?.name;
        return {
          id: p.id,
          slug: p.slug,
          tagKey: name || 'default',
          tag: name || t('blog.defaultTag'),
          date: new Date(p.date).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }),
          title: p.title.rendered,
          excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160) + '…',
          img: p._embedded?.['wp:featuredmedia']?.[0]?.source_url,
        };
      })
    : STATIC_POSTS.map(p => ({
        id: p.id,
        slug: p.slug,
        tagKey: p.tagKey,
        tag: tagLabel(p.tagKey),
        date: t(`blog.posts.${p.slug}.date`),
        title: t(`blog.posts.${p.slug}.title`),
        excerpt: t(`blog.posts.${p.slug}.excerpt`),
        img: p.img,
      }));

  const tags = ['all', ...new Set(posts.map(p => p.tagKey))];
  const tagText = (k) => k === 'all' ? t('common.all') : (posts.find(p => p.tagKey === k)?.tag || k);
  const visible = tag === 'all' ? posts : posts.filter(p => p.tagKey === tag);

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{t('blog.hero.label')}</span>
          <h1 className="page-hero__title">{t('blog.hero.title')}</h1>
          <p className="page-hero__sub">{t('blog.hero.sub')}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('blog.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            {/* Tag filters */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
              {tags.map(tg => (
                <button key={tg} onClick={() => setTag(tg)} style={{
                  padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', transition: 'all .2s', minHeight: 44,
                  background: tag === tg ? 'var(--green)' : 'var(--white)',
                  color: tag === tg ? 'var(--white)' : 'var(--text-muted)',
                  border: tag === tg ? '1.5px solid var(--green)' : '1.5px solid var(--border)',
                }}>{tagText(tg)}</button>
              ))}
            </div>

            {isLoading && (
              <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--text-muted)' }}>
                <p>{t('blog.loadingNews')}</p>
              </div>
            )}

            <div className="grid-3">
              {visible.map(p => (
                <article className="actu-card" key={p.id}>
                  <div className="actu-card__img">
                    <img src={p.img || `https://picsum.photos/600/300?grayscale&random=${p.id}`} alt={p.title} loading="lazy" />
                  </div>
                  <div className="actu-card__body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="actu-card__tag">{p.tag}</span>
                      <span className="actu-card__date">{p.date}</span>
                    </div>
                    <h3 className="actu-card__title">{p.title}</h3>
                    <p className="actu-card__excerpt">{p.excerpt}</p>
                    <Link to={`/blog/${p.slug}`} className="actu-card__link">{t('blog.readMore')}</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
