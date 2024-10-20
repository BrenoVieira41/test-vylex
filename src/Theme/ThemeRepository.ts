import { FilterQuery } from 'mongoose';
import { GenreResponse, Themes, ThemeModel } from './ThemeModel';
import { OrderEnum } from '../Utils/PaginationInterface';

class ThemeRepository {
  private readonly themeRepository: typeof ThemeModel;

  constructor() {
    this.themeRepository = ThemeModel;
  }

  async create(newThemes: Themes[]): Promise<any> {
    try {
      const createdThemes = await ThemeModel.insertMany(newThemes);
      return createdThemes;
    } catch (error) {
      console.error('Error creating themes:', error);
      throw new Error('Failed to create the provided themes');
    }
  }

  async findAllById(id: Number[]): Promise<Themes[]> {
    try {
      const themes = await ThemeModel.find({ id: { $in: id } })
        .sort({ id: 1 })
        .exec();
      return themes;
    } catch (error) {
      console.error('Error finding themes by ID:', error);
      throw new Error('Failed to find themes for the given IDs');
    }
  }

  async find(query: FilterQuery<Themes>): Promise<Themes[]> {
    try {
      const themes = await ThemeModel.find(query).exec();
      return themes;
    } catch (error) {
      console.error('Error finding all themes', error);
      throw new Error('Failed to find all themes');
    }
  }

  async get(id: Number): Promise<Themes | null> {
    try {
      const themes = await ThemeModel.findOne({ id }).exec();
      return themes;
    } catch (error) {
      console.error('Error fetching theme by ID:', error);
      throw new Error('Failed to fetch the theme for the given ID');
    }
  }

  async count(): Promise<Number> {
    try {
      const count = await this.themeRepository.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting themes:', error);
      throw new Error('Failed to count themes in the database');
    }
  }

  async findAllPaginated(
    query: FilterQuery<Themes>,
    size: number,
    offset: number,
    orderBy?: OrderEnum,
  ): Promise<{ themes: Themes[]; total: number }> {
    try {
      const total = await this.themeRepository.countDocuments();
      const themes = await this.themeRepository
        .find(query)
        .sort(orderBy ? { name: orderBy === OrderEnum.asc ? 1 : -1 } : {})
        .skip((offset - 1) * size)
        .limit(size)
        .exec();

      return { themes, total };
    } catch (error) {
      console.error('Error fetching paginated themes:', error);
      throw new Error('Failed to fetch paginated themes from the database');
    }
  }
}

export default ThemeRepository;
