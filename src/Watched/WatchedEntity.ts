export interface Watcheds {
  id: string;
  user_id: string;
  movie_id: number;
  movie_name: string;
  themes: number[];
  created_at: Date;
}

export interface WatchedInput {
  movie_id: number | any;
}

export interface CreateWatched {
  user_id: string;
  movie_id: number;
  movie_name: string;
  themes: number[];
}

export interface UserWatchData {
  userId: string;
  totalFilmsWatched: number;
  mostWatchedTheme: {
    themeId: string | number;
    themeName: string;
    totalFilmsWatched: number;
  };
  lastFilmWatched: {
    movieId: number | string;
    movieName: string;
  };
}
