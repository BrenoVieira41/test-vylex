import { Router } from 'express';
import PackController from './PackController';
import authMiddleware from '../Authenticate';

const router = Router();

router.post('/', authMiddleware, PackController.create);
router.get('/', authMiddleware, PackController.get);
router.patch('/', authMiddleware, PackController.update);

export default router;
