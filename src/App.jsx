import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projets from './pages/Projets';
import Don from './pages/Don';
import Zakat from './pages/Zakat';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import About from './pages/About';
import Statuts from './pages/Statuts';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Confidentialite from './pages/Confidentialite';
import MentionsLegales from './pages/MentionsLegales';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/don" element={<Don />} />
        <Route path="/zakat" element={<Zakat />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/statuts" element={<Statuts />} />
        <Route path="/projets/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--space-4)', textAlign: 'center', padding: 'var(--space-8)' }}>
      <div style={{ fontSize: 64 }}>🕌</div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700, color: 'var(--text-heading)' }}>Page introuvable</h1>
      <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>La page que vous cherchez n'existe pas.</p>
      <a href="/" className="btn btn--primary">Retour à l'accueil →</a>
    </div>
  );
}
