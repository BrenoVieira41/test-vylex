import { Request, Response } from 'express';
import MovieService from './MovieService';

class MovieController {
  async importMovies(req: Request, res: Response): Promise<Response> {
    try {
      const data = await MovieService.importMovies();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error in import movies:', error);
      return res.status(500).json({ message: 'Failed to import movies', error: (error as Error).message });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const movie = await MovieService.get(id);
      return res.status(200).json(movie);
    } catch (error: any) {
      return res.status(500).json({ message: error.message.split('\n') });
    }
  }

  async count(req: Request, res: Response): Promise<Response> {
    try {
      const count = await MovieService.count();
      return res.status(200).json({total: count});
    } catch (error: any) {
      return res.status(500).json({ message: error.message.split('\n') });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const { ids, name } = req.query;
      const movies = await MovieService.find(ids, name);
      return res.status(200).json(movies);
    } catch (error: any) {
      return res.status(500).json({ message: error.message.split('\n') });
    }
  }

  async order(req: Request, res: Response): Promise<Response> {
    try {
      const query= req.query;
      const orderMovies = await MovieService.order(query);
      return res.status(200).json(orderMovies);
    } catch (error: any) {
      return res.status(500).json({ message: error.message.split('\n') });
    }
  }

  // async api(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const data = await MovieService.processGenres();

  //     return res.status(200).json({ message: 'Movies fetched and saved successfully.' });
  //   } catch (error) {
  //     console.error('Error fetching movies:', error);
  //     return res.status(500).json({ message: 'Failed to fetch movies', error: (error as Error).message });
  //   }
  // }
}

export default new MovieController();
