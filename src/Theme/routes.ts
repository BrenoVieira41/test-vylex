import { Router } from 'express';
import ThemeController from './ThemeController';
import authMiddleware from '../Authenticate';

const router = Router();

router.get('/get/:id', ThemeController.get);
router.get('/list', ThemeController.find);
router.get('/api', ThemeController.api);
router.get('/count', ThemeController.count);
router.get('/order', authMiddleware, ThemeController.order);
router.post('/', ThemeController.create);


export default router;
