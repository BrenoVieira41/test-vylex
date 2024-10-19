import { FilterQuery } from 'mongoose';
import { MovieModel, Movies } from './MovieModel';
import { OrderEnum } from '../Utils/PaginationInterface';

class MovieRepository {
  private readonly movieRepository: typeof MovieModel;

  constructor() {
    this.movieRepository = MovieModel;
  }

  async create(newMovies: Partial<Movies>[]): Promise<any> {
    try {
      const createdMovies = await this.movieRepository.insertMany(newMovies);
      return createdMovies;
    } catch (error) {
      console.error('Error creating movies:', error);
      throw new Error('Failed to create the provided movies');
    }
  }

  async get(id: Number): Promise<Movies | null> {
    try {
      const movies = await this.movieRepository.findOne({ id }).exec();
      return movies;
    } catch (error) {
      console.error('Error fetching theme by ID:', error);
      throw new Error('Failed to fetch the theme for the given ID');
    }
  }

  async count(): Promise<Number> {
    try {
      const count = await this.movieRepository.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting movies:', error);
      throw new Error('Failed to count movies in the database');
    }
  }

  public async find(query: FilterQuery<Movies>): Promise<Movies[]> {
    try {
      return await this.movieRepository.find(query).exec();
    } catch (error) {
      console.error('Error querying movies:', error);
      throw error;
    }
  }

  public async findAllPaginated(
    query: FilterQuery<Movies>,
    size: number,
    offset: number,
    orderBy?: OrderEnum,
  ): Promise<{ movies: Movies[]; total: number }> {
    try {
      console.log(query);
      const total = await this.movieRepository.countDocuments(query);
      const movies = await this.movieRepository
        .find(query)
        .sort(orderBy ? { name: orderBy === OrderEnum.asc ? 1 : -1 } : {})
        .skip((offset - 1) * size)
        .limit(size)
        .exec();
      return { movies, total };
    } catch (error) {
      console.error('Error querying movies:', error);
      throw error;
    }
  }
}

export default MovieRepository;
