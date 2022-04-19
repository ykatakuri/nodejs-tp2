import { checkToken, CheckTokenError } from '../common/token.util.js';

export const checkLoginMiddleware = () => (request, response, next) => {
  const credentials = request.body;
  const errors = [];
    if (!credentials.login) {
      errors.push('login is missing');
    } else {
      if (!(typeof credentials.login === 'string')) {
        errors.push('login must be a string');
      }
    }
    if (!credentials.pwd) {
      errors.push('pwd is missing');
    } else {
      if (!(typeof credentials.pwd === 'string')) {
        errors.push('pwd must be a string');
      }
    }
  if (errors.length) {
    next({ code: 400, details: `Body has the following errors: ${errors.join(', ')}` });
  } else {
    next();
  }
};

export const checkTokenMiddleware = () => (request, response, next) => {
  const token = request.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    next({ code: 401, details: 'Authentication token is missing' });
  } else {
    checkToken(token)
      .then(() => next())
      .catch(error => {
        if (error instanceof CheckTokenError) {
          next({ code: 401, details: 'Authentication token is invalid' });
        } else {
          next(error);
        }
      });
  }
};
