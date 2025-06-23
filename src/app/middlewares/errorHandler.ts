import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, PassError) => {
  res.status(400).json({
    message: 'Validation failed',
    success: false,
    error: err
  });
};

export default errorHandler;
