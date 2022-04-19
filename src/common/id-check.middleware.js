export const idCheckMiddleware = transformMode => (request, response, next) => {
    const id = parseInt(request.params.id);
    if (Number.isInteger(id)) {
      if (transformMode) {
        request.params.id = id;
      }
      next();
    } else {
      next({ code: 400, details: 'Bad id' });
    }
  };
  