// middlewares/errorHandler.ts
import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, PassError) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorResponse: any = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';

    const formattedErrors: Record<string, any> = {};
    for (const key in err.errors) {
      formattedErrors[key] = {
        message: err.errors[key].message,
        name: err.errors[key].name,
        properties: err.errors[key].properties,
        kind: err.errors[key].kind,
        path: err.errors[key].path,
        value: err.errors[key].value
      };
    }

    errorResponse = {
      name: err.name,
      errors: formattedErrors
    };
  }

  res.status(statusCode).json({
    message,
    success: false,
    error: errorResponse
  });
};

export default errorHandler;
