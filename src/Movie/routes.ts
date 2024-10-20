import { Router } from 'express';
import MoviesController from './MovieController';
import authMiddleware from '../Authenticate';

const router = Router();

router.get('/import', MoviesController.importMovies);
router.get('/get/:id', MoviesController.get);
router.get('/count', MoviesController.count);
router.get('/list', MoviesController.find);
router.get('/order', authMiddleware, MoviesController.order);

export default router;
