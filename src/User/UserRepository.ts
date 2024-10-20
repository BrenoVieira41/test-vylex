import { CreateUserInput, Users } from './UserEntity';
import prisma from '../prisma';
import { CustomError, PRISMA_ERROR } from '../Utils/ErrorInterface';
import { CodeResponse, ValidationCodeModel } from './CodeModel';
import { createError } from '../Utils/UtilsService';

class UserRepository {
  private readonly codeRepository: typeof ValidationCodeModel;

  constructor() {
    this.codeRepository = ValidationCodeModel;
  }

  async create(data: CreateUserInput): Promise<Users> {
    try {
      const user = await prisma.user.create({ data });
      return user;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }

  async update(id: string, password: string): Promise<Users> {
    try {
      const user = await prisma.user.update({ where: { id }, data: { password } });
      return user;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }

  async findById(id: string): Promise<Users | any> {
    try {
      const user = await prisma.user.findUnique({ where: { id }, include: { packs: true } });
      return user;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      return user;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }

  async saveCode(data: CodeResponse) {
    try {
      const code = await this.codeRepository.create({ user_email: data.user_email, code: data.code });
      return code;
    } catch (error: any) {
      console.error('Error creating code:', error);
      throw createError(
        'An error occurred while trying to generate the password reset code. Please try again later.',
        500,
      );
    }
  }

  async getCode(user_email: string) {
    try {
      const code = await this.codeRepository.findOne({ user_email });
      return code;
    } catch (error: any) {
      console.error('Error in find code:', error);
      throw createError(
        'An error occurred while trying to generate the password reset code. Please try again later.',
        500,
      );
    }
  }

  async deleteCode(user_email: string) {
    try {
      await this.codeRepository.deleteOne({ user_email });
      return 'Code deleted';
    } catch (error: any) {
      console.error('Error creating code:', error);
      throw createError(
        'An error occurred while trying to generate the password reset code. Please try again later.',
        500,
      );
    }
  }
}

export default UserRepository;
