import { checkToken, CheckTokenError } from '../common/token.util.js';

export const roleCheckMiddleware = (request, response, next) => {
  const token = request.headers.authorization?.split('Bearer ')[1];
  checkToken(token)
      .then(payload => {

        const role = payload.userRole;
      switch (role) {
        case "admin":
          next();
          break;
        case "contributor":
          next();
          break;
        default:
          next({ code: 403, details: 'User unauthorized' });
          break;
      }
      })
    
  };