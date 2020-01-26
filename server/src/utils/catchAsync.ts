import { NextFunction, Request, Response } from 'express';

// перехват асинхронных ошибок
// при ошибке передаем управление аргументу next
// в блоке catch, так-как возвращаемая функция является промисом
const catchAsync = (callback: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
};

export = catchAsync;
