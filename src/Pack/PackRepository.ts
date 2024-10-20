import prisma from '../prisma';
import { PRISMA_ERROR } from '../Utils/ErrorInterface';
import { CreatePack, Packs } from './PackEntity';

class PackRepository {
  async create(data: CreatePack): Promise<Packs> {
    try {
      const pack = await prisma.pack.create({ data });
      return pack;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }

  async findByUser(user_id: string) {
    try {
      const pack = await prisma.pack.findUnique({ where: { user_id } });
      return pack;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }

  async update(id: string, themes: number[]): Promise<Packs> {
    try {
      const user = await prisma.pack.update({ where: { id }, data: { themes } });
      return user;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }
}

export default PackRepository;
