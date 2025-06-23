import { Response } from 'express';

const generalResponse = (res: Response,statusCode: number,message: string,data: any): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export default generalResponse;
