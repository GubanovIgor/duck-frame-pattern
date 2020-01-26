import { NextFunction, Request, Response } from 'express';

export const getIndex = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render('index', {
    hello: 'Hello Man!',
    title: 'Главная страница',
  });
};

export const postIndex = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  res.status(200).json({
    email,
  });
};
