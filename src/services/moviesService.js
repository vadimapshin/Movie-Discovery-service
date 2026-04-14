import { getMovieById, saveMovie } from '../repositories/movieRepository.js';
import { getMoviesDetails } from '../clients/tmdbClient.js';

export async function getMovie(id) {
  const cached = await getMovieById(id);

  if (cached) {
    return cached;
  }

  const movie = await getMoviesDetails(id);

  await saveMovie(movie);

  return movie;
}
