import { matchService } from './match.service.js';
import { ResourceNotFoundError } from '../common/repository-error.js';

class MatchController {
  findAll = (request, response) => {
    matchService.findAll()
      .then(items => {
        response.header('x-total-count', `${items.length}`);
        response.json(items);
      });
  };

  find = (request, response, next) => {
    const id = request.params.id;
    matchService.findById(id)
      .then(item => {
        response.json(item);
      })
      .catch(error => {
        if (error instanceof ResourceNotFoundError) {
          next({ code: 404, details: `Resource with id=${id} does not exist` });
        } else {
          next(error);
        }
      });
  };

  create = (request, response) => {
    matchService.create(request.body)
      .then(item => {
        response.status(201);
        response.json(item);
      });
  };

  patch = (request, response, next) => {
    const id = request.params.id;
    matchService.patch(id, request.body)
      .then(item => {
        response.json(item);
      })
      .catch(error => {
        if (error instanceof ResourceNotFoundError) {
          next({ code: 404, details: `Resource with id=${id} does not exist` });
        } else {
          next(error);
        }
      });
  };

  set = (request, response, next) => {
    const id = request.params.id;
    matchService.set(id, request.body)
      .then(item => {
        response.json(item);
      })
      .catch(error => {
        if (error instanceof ResourceNotFoundError) {
          next({ code: 404, details: `Resource with id=${id} does not exist` });
        } else {
          next(error);
        }
      });
  };

  delete = (request, response, next) => {
    const id = request.params.id;
    matchService.delete(id)
      .then(() => {
        response.status(204);
        response.json();
      })
      .catch(error => {
        if (error instanceof ResourceNotFoundError) {
          next({ code: 404, details: `Resource with id=${id} does not exist` });
        } else {
          next(error);
        }
      });
  };
}

export const matchController = new MatchController();
