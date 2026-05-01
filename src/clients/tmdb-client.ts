import { env } from '../env/index.js';
import { ExternalApiError } from '../errors/external-api-error.js';
import type { TmdbSearchResponse, TmdbMovie } from '../modules/movies/movies-types.js';
const BASE_URL = env.TMDB_BASE_URL;

export async function searchMovies(query: string, page = 1): Promise<TmdbSearchResponse> {
  const url = `${BASE_URL}/search/movie?api_key=${env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new ExternalApiError(`TMDb API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getMovieDetails(id: number): Promise<TmdbMovie> {
  const url = `${BASE_URL}/movie/${id}?api_key=${env.TMDB_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new ExternalApiError(`TMDb API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}