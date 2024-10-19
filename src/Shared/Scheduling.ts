import { scheduleJob } from 'node-schedule';
import { config } from 'dotenv';
import ThemeService from '../Theme/ThemeService';
import mongoose from 'mongoose';

config();

const mongoUri = process.env.MONGO_URL || 'test';
(async () => {
  await mongoose.connect(mongoUri);
  console.log('Scheduler started...');
  // scheduleJob('0 */2 * * *', () => {
  scheduleJob('*/1 * * * *', async () => {
    try {
      console.log('Running createThemesApi...');
      const newThemes = await ThemeService.createThemesApi();
      console.log('New themes created:', newThemes);
    } catch (error) {
      console.error('Error creating themes:', error);
    }
  });
})();
