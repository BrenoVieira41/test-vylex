import { Router } from 'express';
import MoviesController from './MovieController';

const router = Router();

router.get('/import', MoviesController.importMovies);
router.get('/get/:id', MoviesController.get);
router.get('/count', MoviesController.count);
router.get('/list', MoviesController.find);
router.get('/order', MoviesController.order);

export default router;
