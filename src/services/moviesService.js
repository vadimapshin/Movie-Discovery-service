import { getMovieById, saveMovie } from '../repositories/movieRepository.js';
import { getMoviesDetails, searchMovies } from '../clients/tmdbClient.js';
import { redis } from '../clients/redisClient.js';

const ONE_HOUR_IN_SECONDS = 60 * 60;
const FIFTEEN_MINUTES_IN_SECONDS = 60 * 15;

export async function getMovie(id) {
  const cacheKey = `movie:${id}`;

  const cachedMovie = await redis.get(cacheKey);

  if (cachedMovie) {
    console.log(`[Redis] Cache HIT for key ${cacheKey}`);
    return JSON.parse(cachedMovie);
  }

  console.log(`[Redis] Cache MISS for key ${cacheKey}`);

  let movie = await getMovieById(id);

  if (movie) {
    console.log(`[Postgres] Found movie ${id} in database`);

    await redis.set(cacheKey, JSON.stringify(movie), 'EX', ONE_HOUR_IN_SECONDS);

    return movie;
  }

  console.log(`[TMDb] Fetching movie ${id} from external API`);

  movie = await getMoviesDetails(id);

  await saveMovie(movie);

  await redis.set(cacheKey, JSON.stringify(movie), 'EX', ONE_HOUR_IN_SECONDS);

  return movie;
}

export async function searchMoviesService(query, page = 1) {
  const cacheKey = `search:${query}:${page}`;

  const cachedSearch = await redis.get(cacheKey);

  if (cachedSearch) {
    console.log(`[Redis] Cache HIT for key ${cacheKey}`);
    return JSON.parse(cachedSearch);
  }

  console.log(`[Redis] Cache MISS for key ${cacheKey}`);

  const data = await searchMovies(query, page);

  if (Array.isArray(data.results)) {
    for (const movie of data.results) {
      try {
        await saveMovie(movie);
      } catch (err) {
        console.error(`[Service] saveMovie failed for movie ${movie.id}`, err);
      }
    }
  }

  await redis.set(cacheKey, JSON.stringify(data), 'EX', FIFTEEN_MINUTES_IN_SECONDS);
  return data;
}
