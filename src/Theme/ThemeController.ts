import { Request, Response } from 'express';
import ThemeService from './ThemeService';

class ThemeController {
  async api(req: Request, res: Response): Promise<Response> {
    try {
      const data = await ThemeService.getThemesApi();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching themes:', error);
      return res.status(500).json({ message: 'Failed to fetch themes', error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createThemes = await ThemeService.createThemesApi();
      return res.status(201).json(createThemes);
    } catch (error) {
      console.error('Error create themes:', error);
      return res.status(401).json({ message: 'Failed to create themes', error: (error as Error).message });
    }
  }

  async order(req: Request, res: Response): Promise<Response> {
    try {
      const query = req.query;
      const user = req.user;
      const themes = await ThemeService.findThemes(query, user);
      return res.status(200).json(themes);
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message.split('\n') });
    }
  }

  async count(req: Request, res: Response): Promise<Response> {
    try {
      const count = await ThemeService.count();
      return res.status(200).json({total: count});
    } catch (error: any) {
      return res.status(500).json({ message: error.message.split('\n') });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const theme = await ThemeService.get(id);
      return res.status(200).json(theme);
    } catch (error: any) {
      return res.status(500).json({ message: error.message.split('\n') });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const { ids } = req.query;
      const createThemes = await ThemeService.find(ids);
      return res.status(200).json(createThemes);
    } catch (error: any) {
      return res.status(500).json({ message: error.message.split('\n') });
    }
  }

}

export default new ThemeController();
