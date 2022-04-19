import { Router } from 'express';
import { authController } from './auth.controller.js';
import { checkLoginMiddleware } from './auth.middleware.js';

export const authRouter = Router();

authRouter.post('/registration', authController.create);
authRouter.post('/login', checkLoginMiddleware(), authController.login);
