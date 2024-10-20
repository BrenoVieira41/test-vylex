import { JwtPayload } from 'jsonwebtoken';
import { Packs } from '../Pack/PackEntity';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  borndate: string | Date;
}

export interface RequestPasswordResetInput {
  email: string;
}

export interface ConfirmPasswordResetInput {
  id: string;
  code: string | number;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface Users {
  id: string;
  name: string;
  email: string;
  password?: string;
  borndate: Date | string;
  packs?: Packs;
  created_at: Date;
  updated_at: Date;
}

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
}
