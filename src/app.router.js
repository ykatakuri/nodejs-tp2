import { Router } from 'express';
import { matchRouter } from './match/match.router.js';
import { resourceNotHandledMiddleware } from './common/resource-not-handled.middleware.js';
import { authRouter } from './auth/auth.router.js';

export const appRouter = Router();
appRouter.use('/auth', authRouter);
appRouter.use('/matches', matchRouter);
appRouter.use(resourceNotHandledMiddleware);
