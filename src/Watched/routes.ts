import { Router } from 'express';
import WatchedController from './WatchedController';
import authMiddleware from '../Authenticate';

const router = Router();

router.post('/', authMiddleware, WatchedController.create);
router.get('/get/:id', authMiddleware, WatchedController.get);
router.get('/find', authMiddleware, WatchedController.infos);
router.delete('/:id', authMiddleware, WatchedController.unwatch);

export default router;
