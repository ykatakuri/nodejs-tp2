import { ResourceNotFoundError } from '../common/repository-error.js';
import { EmptyResultError, Op } from 'sequelize';
import { UserModel } from './user.model.js';

class UserService {
  create = item => Promise.resolve()
    .then(() => {
      const itemToCreate = {
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        password: item.password,
      };
      return UserModel.create(itemToCreate);
    })
    .then(item => item.dataValues);

  findByCredentials = (email, password) => UserModel.findOne({
    where: {
      email,
      password
    },
    rejectOnEmpty: true
  })
    .catch(error => {
      if (error instanceof EmptyResultError) {
        throw new ResourceNotFoundError();
      }
      throw error;
    });
}

export const userService = new UserService();
