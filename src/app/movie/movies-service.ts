import type { FastifyInstance } from 'fastify';

import { MovieRepository } from './movies-repository.js';

import {
  mapTmdbMovieToMovie,
  mapTmdbSearchResponseToMovieSearchResponse,
} from '../../../utils/movies-mapper.js';

const ONE_HOUR_IN_SECONDS = 60 * 60;
const FIFTEEN_MINUTES_IN_SECONDS = 60 * 15;

export class MovieService {
  constructor(
    private readonly fastify: FastifyInstance,
    private readonly movieRepository: MovieRepository,
  ) {}

  async getMovie(id: number) {
    const cacheKey = `movie:${id}`;

    const cachedMovie = await this.fastify.cache.get(cacheKey);

    if (cachedMovie) {
      return cachedMovie;
    }

    let movie = await this.movieRepository.getById(id);

    if (movie) {
      await this.fastify.cache.set(
        cacheKey,
        movie,
        ONE_HOUR_IN_SECONDS,
      );

      return movie;
    }

    const tmdbMovie =
      await this.fastify.tmdbClient.getMovieDetails(id);

    movie = mapTmdbMovieToMovie(tmdbMovie);

    await this.movieRepository.save(movie);

    await this.fastify.cache.set(
      cacheKey,
      movie,
      ONE_HOUR_IN_SECONDS,
    );

    return movie;
  }

  async searchMovies(query: string, page = 1) {
    const cacheKey = `search:${query}:${page}`;

    const cachedSearch =
      await this.fastify.cache.get(cacheKey);

    if (cachedSearch) {
      return cachedSearch;
    }

    const data =
      await this.fastify.tmdbClient.searchMovies(query, page);

    const mappedData =
      mapTmdbSearchResponseToMovieSearchResponse(data);

    for (const movie of mappedData.results) {
      await this.movieRepository.save(movie);
    }

    await this.fastify.cache.set(
      cacheKey,
      mappedData,
      FIFTEEN_MINUTES_IN_SECONDS,
    );

    return mappedData;
  }
}