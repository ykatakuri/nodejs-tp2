import { Router } from 'express';
import { idCheckMiddleware } from '../common/id-check.middleware.js';
import { roleCheckMiddleware } from '../common/role-check.middleware.js';
import { matchCheckMiddleware } from './match.middleware.js';
import { matchController } from './match.controller.js';
import { resourceMethodNotHandledMiddleware } from '../common/resource-not-handled.middleware.js';
import { checkTokenMiddleware } from '../auth/auth.middleware.js';

export const matchRouter = Router();

matchRouter.get('/', matchController.findAll);
matchRouter.get('/:id', idCheckMiddleware(true), matchController.find);
matchRouter.post('/', matchCheckMiddleware(true), roleCheckMiddleware, matchController.create);
matchRouter.patch('/:id', idCheckMiddleware(true), matchCheckMiddleware(false), roleCheckMiddleware, matchController.patch);
matchRouter.put('/:id', idCheckMiddleware(true), matchCheckMiddleware(false), roleCheckMiddleware, matchController.set);
matchRouter.delete('/:id', checkTokenMiddleware(), idCheckMiddleware(true), roleCheckMiddleware, matchController.delete);
matchRouter.use(resourceMethodNotHandledMiddleware);
