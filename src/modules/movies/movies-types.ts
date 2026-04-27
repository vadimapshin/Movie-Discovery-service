export interface Movie {
  id: number;
  title: string;
  overview: string | null;
  releaseDate: string | null;
  posterPath: string | null;
  voteAverage: number | null;
}

export interface TmdbMovie {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  poster_path?: string;
  vote_average?: number;
}

export interface TmdbSearchResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}