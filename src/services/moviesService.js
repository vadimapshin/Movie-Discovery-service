import { getMovieById, saveMovie } from '../repositories/movieRepository.js';
import { getMoviesDetails, searchMovies } from '../clients/tmdbClient.js';

export async function getMovie(id) {
  const cached = await getMovieById(id);

  if (cached) {
    console.log('CACHE HIT');
    return cached;
  }

  console.log('CACHE MISS');

  const movie = await getMoviesDetails(id);

  await saveMovie(movie);

  return movie;
}

export async function searchMoviesService(query, page = 1) {
  const result = await searchMovies(query, page);

  for (const movie of result.results) {
    await saveMovie(movie);
  }

  return result;
}
