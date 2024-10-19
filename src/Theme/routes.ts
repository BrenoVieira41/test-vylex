import { Router } from 'express';
import ThemeController from './ThemeController';

const router = Router();

// @ts-ignore
router.get('/get/:id', ThemeController.get);
// @ts-ignore
router.get('/list', ThemeController.find);
// @ts-ignore
router.get('/api', ThemeController.api);
// @ts-ignore
router.get('/count', ThemeController.count);
// @ts-ignore
router.get('/order', ThemeController.order);
// @ts-ignore
router.post('/', ThemeController.create);
// @ts-ignore


export default router;
