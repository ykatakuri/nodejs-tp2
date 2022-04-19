import { userService } from '../user/user.service.js';
import { ResourceNotFoundError } from '../common/repository-error.js';
import { generateToken } from '../common/token.util.js';


class AuthController {

  create = (request, response) => {
    userService.create(request.body)
      .then(item => {
        response.status(201);
        response.json(item);
      });
  };

  login = (request, response, next) => Promise.resolve()
    .then(() => {
      const { login, pwd } = request.body;
      return userService.findByCredentials(login, pwd);
    })
    .then(user => generateToken(user))
    .then(token => response.json({
      token
    }))
    .catch(error => {
      if (error instanceof ResourceNotFoundError) {
        next({ code: 401, details: `Provided login or password is incorrect` });
      } else {
        next(error);
      }
    });
}

export const authController = new AuthController();
