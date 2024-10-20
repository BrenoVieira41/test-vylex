import { Request, Response } from 'express';
import UserService from './UserService';
import { CustomError } from '../Utils/ErrorInterface';

class UserController {
  async me(req: Request, res: Response): Promise<Response> {
    try {
      const user = req.user;
      const newUser = await UserService.me(user);
      return res.status(200).send(newUser);
    } catch (error: CustomError | any) {
      console.error(error);
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const newUser = await UserService.create(data);
      return res.status(200).send(newUser);
    } catch (error: CustomError | any) {
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const userLogin = await UserService.userLogin(data);
      return res.status(200).send(userLogin);
    } catch (error: CustomError | any) {
      console.error(error);
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }

  async generateResetCode(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.query;
      const generateResetCode = await UserService.generateResetCode(email);
      return res.status(200).send(generateResetCode);
    } catch (error: CustomError | any) {
      console.error(error);
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const generateResetCode = await UserService.resetPassword(data);
      return res.status(200).send({ message: generateResetCode });
    } catch (error: CustomError | any) {
      console.error(error);
      return res.status(error.status || 500).json({ message: error.message?.split('\n') });
    }
  }
}

export default new UserController();
