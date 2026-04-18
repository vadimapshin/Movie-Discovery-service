import fetch from 'node-fetch';
import { config } from '../config/env.js';

const BASE_URL = config.TMDB_BASE_URL;

export async function searchMovies(query, page = 1) {
  const url = `${BASE_URL}/search/movie?api_key=${config.TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getMoviesDetails(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${config.TMDB_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
