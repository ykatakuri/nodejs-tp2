export const bodyFormatErrorMiddleware = (error, request, response, next) => {
    if (error instanceof SyntaxError) {
      next({ code: 400, details: 'Bad body' });
    } else {
      next(error);
    }
  };
  