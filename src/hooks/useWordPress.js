import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const WP_API = import.meta.env.VITE_WP_API_URL || 'https://wakf.ch/wp-json/wp/v2';

const api = axios.create({ baseURL: WP_API });

// Sur wakf.ch, l'adresse par défaut de l'API est le site lui même : Netlify répond alors par la page
// d'accueil (HTML, code 200). Toute réponse qui n'est pas un tableau JSON est traitée comme une erreur,
// ce qui déclenche le repli sur les articles statiques au lieu d'un écran blanc.
const asList = (data) => {
  if (!Array.isArray(data)) throw new Error('Réponse WordPress invalide');
  return data;
};

export function usePosts(params = {}) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => api.get('/posts', { params: { _embed: true, per_page: 9, ...params } }).then(r => asList(r.data)),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePost(slug) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => api.get('/posts', { params: { slug, _embed: true } }).then(r => asList(r.data)[0] ?? null),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProjects(params = {}) {
  return useQuery({
    queryKey: ['projets', params],
    queryFn: () => api.get('/projet', { params: { _embed: true, per_page: 20, ...params } }).then(r => asList(r.data)),
    staleTime: 5 * 60 * 1000,
  });
}
