import { Request, Response } from 'express';
import PackService from './PackService';
import { CustomError } from '../Utils/ErrorInterface';

class PackController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const user = req.user;
      const newPack = await PackService.create(data, user);
      return res.status(200).send(newPack);
    } catch (error: CustomError | any) {
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const user = req.user;
      const pack = await PackService.get(user);
      return res.status(200).send(pack);
    } catch (error: CustomError | any) {
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const user = req.user;
      const updatedPack = await PackService.update(data, user);
      return res.status(200).send(updatedPack);
    } catch (error: CustomError | any) {
      console.error(error);
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }
}

export default new PackController();
