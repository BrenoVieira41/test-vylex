import { Router } from 'express';
import UserController from './UserController';
import AuthMiddleware from '../Authenticate';


const router = Router();

router.post('/', UserController.createUser);
router.post('/login', UserController.login);
router.get('/reset-code', UserController.generateResetCode);
router.patch('/reset-password', UserController.resetPassword);
router.get('/', AuthMiddleware, UserController.me);

export default router;
