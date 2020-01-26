import { NextFunction, Request, Response } from 'express';
import { camelizeKeys } from 'humps';
import jsonwebtoken from 'jsonwebtoken';
import { promisify } from 'util'; // замена колбека на промис
import { userModel } from '../models/user/userModel';
import { appError } from '../utils/AppError';
import catchAsync from '../utils/catchAsync';

// генерирование токена на время
// и с уникальным именем
// и id пользователя
const signToken = (id: number, email: string) => {
	return jsonwebtoken.sign(
    { id, email },
    String(process.env.JWT_SECRET),
    { expiresIn: String(process.env.JWT_EXPIRES_IN) },
  );
};
// запись токена в куку
const createSendToken = (user: any, statusCode: number, req: Request, res: Response) => {
  const id = user._id;
  const email = user.email;
  const token = signToken(id, email);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
    },
  });
};

// регистрация
export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let r: any;
  r = camelizeKeys(req.body);
  const { name, email, password, passwordConfirm  } = r;
  // 1) Проверяем наличие полей
  if (!email || !password || !passwordConfirm) {
    res.status(401).json(appError(400, 'Укажите адрес электронной почты, пароль и подверждение пороля.'));
    return next();
  }
  // 2) делаем запись в базу
  const newUser = await userModel.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  // 3) ждем resolve и отправляем токен
  createSendToken(newUser, 200, req, res);
});

// вход
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // 1) Проверка наличия полей в запросе email и password
  if (!email || !password) {
    res.status(401).json(appError(400, 'Неуказан адрес электронной почты и пароль'));
    return next();
  }
  // 2) Проверка на существование пользователя и проверка корректности пароля
  const user = await userModel.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json(appError(401, 'Некорректный адрес электронной почты или пароль'));
    return next();
  }
  // 3) Если все хорошо, отправляем токен
  createSendToken(user, 200, req, res);
});

// выход
export const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // 1) Удаление токена из куки
  await res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
});

// проверка на авторизацию
export const check = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token: any;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    res.status(401).json(appError(401, 'Вы не авторизованы! Пожалуйста, войдите.'));
    return next();
  }

  let decoded: any;
  decoded = await promisify(jsonwebtoken.verify)(token, String(process.env.JWT_SECRET));
  const currentUser = await userModel.findById(decoded.id);
  if (!currentUser) {
    res.status(401).json(appError(401, 'Пользователь, с таким токеном, больше не существует.'));
    return next();
  }
  res.locals.user = currentUser;
  res.status(200).json({
    status: 'success',
    data: {
      user: currentUser,
    },
  });
  next();
});
