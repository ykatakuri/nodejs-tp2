import { ResourceNotFoundError } from '../common/repository-error.js';
import { MatchModel } from './match.model.js';
import { EmptyResultError } from 'sequelize';

class MatchService {
  findAll = () => MatchModel.findAll();

  findById = id => MatchModel.findByPk(id, { rejectOnEmpty: true })
    .catch(error => {
      if (error instanceof EmptyResultError) {
        throw new ResourceNotFoundError();
      }
      throw error;
    });

  create = item => Promise.resolve()
    .then(() => {
      const itemToCreate = {
        rating: item.rating,
        content: item.content
      };
      return MatchModel.create(itemToCreate);
    })
    .then(item => item.dataValues);

  patch = (id, item) => Promise.resolve()
    .then(() => {
      const commentToUpdate = {
        rating: item.rating,
        content: item.content,
      };
      return MatchModel.update(commentToUpdate, { where: { id } });
    })
    .then(() => MatchModel.findByPk(id, { rejectOnEmpty: true }));

  set = (id, item) => Promise.resolve()
    .then(() => {
      const commentToUpdate = {
        rating: item.rating ?? null,
        content: item.content ?? null
      };
      return MatchModel.update(commentToUpdate, { where: { id } });
    })
    .then(() => MatchModel.findByPk(id, { rejectOnEmpty: true }));


  delete = id => MatchModel.destroy({ where: { id } })
    .then(deletedRowsCount => {
      if (!deletedRowsCount) {
        throw new ResourceNotFoundError();
      }
    });
}

export const matchService = new MatchService();
