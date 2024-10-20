import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomJwtPayload, Users } from '../src/User/UserEntity';
import { CustomError } from './Utils/ErrorInterface';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET || 'secret';

  if (!authorization) return res.status(401).json({ message: ['Invalid token or token has expired.'] });

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = verify(token, secret) as CustomJwtPayload;
    req.user = data as Users;

    return next();
  } catch (error: CustomError | any) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message?.split('\n') });
  }
}
