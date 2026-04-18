import fetch from 'node-fetch';
import { config } from '../config/env.js';

const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query, page = 1) {
  const url = `${BASE_URL}/search/movie?api_key=${config.TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
