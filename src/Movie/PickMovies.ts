// import fs from 'fs/promises';
// import ThemeRepository from '../Theme/ThemeRepository';
// import { MoviesGenderResponse, MoviesResponse } from './MovieModel';

// const FILE_PATH = 'movies.json';
// const ERROR_FILE_PATH = 'error_log.json';

// class MovieService {
//   private readonly themeRepository: ThemeRepository;

//   constructor() {
//     this.themeRepository = new ThemeRepository();
//   }

//   async fetchMoviesByGenre(genreId: number, page: number): Promise<MoviesGenderResponse | null> {
//     console.log(genreId, page);
//     const url = `https://api.themoviedb.org/3/genre/${genreId}/movies?page=${page}`;
//     const API_KEY = process.env.API_BARREAR || 'test';
//     const MAX_RETRIES = Number(process.env.MAX_RETRIES) || 10;

//     for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
//       try {
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             accept: 'application/json',
//             Authorization: API_KEY,
//           },
//         });

//         if (!response.ok) throw new Error(`Request failed with status: ${response.status}`);

//         const movies: MoviesGenderResponse | any = await response.json();
//         return movies;
//       } catch (error) {
//         console.error(`Attempt ${attempt} failed: ${error.message}`);
//         if (attempt === MAX_RETRIES) {
//           // missed
//           await fs.appendFile(ERROR_FILE_PATH, JSON.stringify({ error: error.message, genreId, page }) + '\n');
//           return null; // all miss
//         }
//       }
//     }
//     return null;
//   }

//   async saveMovies(movies: MoviesResponse[]) {
//     let existingMovies = [];

//     // read movie
//     try {
//       const data = await fs.readFile(FILE_PATH, 'utf-8');
//       existingMovies = JSON.parse(data);
//     } catch (error) {
//       console.error('Failed to read existing movies:', error.message);
//     }

//     const newMovies = movies.map(movie => ({
//       id: movie.id,
//       title: movie.title,
//       genre_ids: movie.genre_ids
//     }));

//     const updatedMovies = [...existingMovies, ...newMovies];
//     await fs.writeFile(FILE_PATH, JSON.stringify(updatedMovies, null, 2)); // Salva no arquivo
//   }

//   async processGenres() {
//     const themes = await this.themeRepository.findAll();
//     const genres = themes.map((theme) => theme.id);

//     for (const genreId of genres) {
//       let page = 1;
//       let totalPages = 1;

//       while (page <= totalPages) { //good-by pc ;-;
//         const moviesResponse = await this.fetchMoviesByGenre(genreId, page);

//         if (moviesResponse) {
//           const { results, total_pages, total_results } = moviesResponse;
//           await this.saveMovies(results);
//           totalPages = total_pages;
//           console.log(`Page: ${page}, Total Pages: ${total_pages}, Total Results: ${total_results}`);
//         } else {
//           console.log(`Failed to fetch movies for genre ${genreId} on page ${page}`);
//           break;
//         }

//         page++;
//         const REQUESTS_PER_SECOND = Number(process.env.REQUESTS_PER_SECOND) || 2;
//         await new Promise((resolve) => setTimeout(resolve, 1500 / REQUESTS_PER_SECOND));
//       }
//     }
//   }
// }

// export default new MovieService();
