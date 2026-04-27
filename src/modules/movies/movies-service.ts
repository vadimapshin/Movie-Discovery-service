import type Redis from 'ioredis';
import { MovieRepository } from './movies-repository.js';
import { getMovieDetails, searchMovies } from '../../clients/tmdb-client.js';

const ONE_HOUR_IN_SECONDS = 60 * 60;
const FIFTEEN_MINUTES_IN_SECONDS = 60 * 15;

export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly redis: Redis,
  ) {}

  async getMovie(id: number) {
    const cacheKey = `movie:${id}`;

    const cachedMovie = await this.redis.get(cacheKey);

    if (cachedMovie) {
      return JSON.parse(cachedMovie);
    }

    let movie = await this.movieRepository.getById(id);

    if (movie) {
      await this.redis.set(cacheKey, JSON.stringify(movie), 'EX', ONE_HOUR_IN_SECONDS);
      return movie;
    }

    movie = await getMovieDetails(id);

    await this.movieRepository.save(movie);
    await this.redis.set(cacheKey, JSON.stringify(movie), 'EX', ONE_HOUR_IN_SECONDS);

    return movie;
  }

  async searchMovies(query: string, page = 1) {
    const cacheKey = `search:${query}:${page}`;

    const cachedSearch = await this.redis.get(cacheKey);

    if (cachedSearch) {
      return JSON.parse(cachedSearch);
    }

    const data = await searchMovies(query, page);

    if (Array.isArray(data.results)) {
      for (const movie of data.results) {
        await this.movieRepository.save(movie);
      }
    }

    await this.redis.set(cacheKey, JSON.stringify(data), 'EX', FIFTEEN_MINUTES_IN_SECONDS);

    return data;
  }
}