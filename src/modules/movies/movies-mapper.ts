import type { Movie, TmdbMovie } from './movies-types.js';

export function mapTmdbMovieToMovie(tmdbMovie: TmdbMovie): Movie {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title ?? tmdbMovie.name ?? 'Unknown title',
    overview: tmdbMovie.overview ?? null,
    releaseDate: tmdbMovie.release_date ?? null,
    posterPath: tmdbMovie.poster_path ?? null,
    voteAverage: tmdbMovie.vote_average ?? null,
  };
}