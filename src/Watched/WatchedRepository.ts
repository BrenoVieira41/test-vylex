import prisma from '../prisma';
import { PRISMA_ERROR } from '../Utils/ErrorInterface';
import { CreateWatched, Watcheds } from './WatchedEntity';

class WatchedRepository {
  async create(data: CreateWatched): Promise<Watcheds> {
    try {
      const watched = await prisma.watched.create({ data });
      return watched;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }

  async watched(movie_id: number, user_id: string) {
    try {
      const watched = await prisma.watched.findFirst({ where: { movie_id, user_id } });
      return watched;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }

  async get(id: string, user_id: string) {
    try {
      const watched = await prisma.watched.findFirst({ where: { id, user_id } });
      return watched;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }

  async findAll(user_id: string) {
    try {
      const watcheds = await prisma.watched.findMany({ where: { user_id } });
      return watcheds;
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }

  async unwatch(id: string) {
    try {
      await prisma.watched.delete({ where: { id } });
      return 'Movie unwatched';
    } catch (error: any) {
      console.error('Prisma error:', error);
      throw new Error(PRISMA_ERROR);
    }
  }
}

export default WatchedRepository;
