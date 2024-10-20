import { Request, Response } from 'express';
import WatchedService from './WatchedService';
import { CustomError } from '../Utils/ErrorInterface';

class WatchedController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const user = req.user;
      const newPack = await WatchedService.create(data, user);
      return res.status(200).send(newPack);
    } catch (error: CustomError | any) {
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = req.user;
      const pack = await WatchedService.get(id, user);
      return res.status(200).send(pack);
    } catch (error: CustomError | any) {
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }

  async infos(req: Request, res: Response): Promise<Response> {
    try {
      const user = req.user;
      const pack = await WatchedService.infos(user);
      return res.status(200).send(pack);
    } catch (error: CustomError | any) {
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }

  async unwatch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = req.user;
      const unwatch = await WatchedService.unwatch(id, user);
      return res.status(200).send({ message: unwatch });
    } catch (error: CustomError | any) {
      console.error(error);
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }
}

export default new WatchedController();
