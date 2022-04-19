export const resourceNotHandledMiddleware = (request, response, next) => {
    next({ code: 404, details: `Resource=${request.originalUrl} does not exist` });
  };
  
  export const resourceMethodNotHandledMiddleware = (request, response, next) => {
    next({ code: 404, details: `Method=${request.method} not handled for url=${request.originalUrl}` });
  };
  