import { config } from 'dotenv';
import { app } from './app';
import prisma from './prisma';
import mongoose from 'mongoose';

import MovieService from './Movie/MovieService';
import ThemeService from './Theme/ThemeService';

config();

const appPort = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URL || 'test';

const startServer = async () => {
  try {
    await prisma.$connect();
    await mongoose.connect(mongoUri);

    const moviesCount = await MovieService.count();
    const themesCount = await ThemeService.count();

    if (!themesCount) {
      try {
        console.log('No themes found. Generating themes...');
        await ThemeService.createThemesApi();
        console.log('Themes created successfully.');
      } catch (error) {
        console.error('Error creating themes:', error);
      }
    }

    if (!moviesCount) {
      try {
        console.log('No movies found. Generating movies...');
        await MovieService.importMovies();
        console.log('Movies imported successfully.');
      } catch (error) {
        console.error('Error importing movies:', error);
      }
    }

    app.listen(appPort, () => {
      console.log(`[server]: Server is running at http://localhost:${appPort}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
