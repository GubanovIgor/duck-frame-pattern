import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import expressMongoSanitize from 'express-mongo-sanitize';
import expressRateLimit from 'express-rate-limit';
import expressSession from 'express-session';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import * as path from 'path';
import XXSSProtection from 'X-XSS-Protection';

// Routes import
// import viewRoutes from './routes/viewRoutes';

import userRoutes from './routes/userRoutes';

const APP = express();

// Используем прокси, и ему можно доверять
APP.enable('trust proxy');

// Настройки сессии
APP.use(expressSession({
  name: String(process.env.SESS_NAME),
  secret: String(process.env.SESS_SECRET),
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: +1000 * 60 * 60 * 24,
    secure: true,
  },
}));

// Шаблонизатор
// На случай отсутствия нормального клиента
APP.set('view engine', 'pug');
APP.set('views', path.join(__dirname, 'views'));

// Добавляем CORS
// APP.use(cors());
// или с опциями
// Access-Control-Allow-Origin *
APP.use(cors({
  credentials: true,
  origin: 'http://localhost:9090',
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
}));
APP.options('*', cors());
// или для каждого поинта отдельно
// app.options('/api/v1/some', cors());

// Путь до директория со статическими файлами
APP.use(express.static(path.join(__dirname, 'public')));

// Небольшая защита в виде добавления
// HTTP заголовков
APP.use(helmet());

// В режиме разработки добавляем логгер запросов в консоль
if (process.env.NODE_ENV === 'development') {
  APP.use(morgan('dev'));
}

// Установка лимита запросов на АПИ с одного IP
const limiter = expressRateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  // tslint:disable-next-line: object-literal-sort-keys
  message: 'Слишком много запросов с этого IP, повторите через час!',
});
APP.use('/api', limiter);
// Лимит на чтение данных из тела запроса
APP.use(express.json({
  limit: '50kb',
  type: 'application/json',
}));

// Переданные данные в формате json
// с заголовком Content-Type: application / x-www-form-urlencoded
// будут распаршены
// до версии Express 4.16 использовали body-parser
APP.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Для парсинга куки
APP.use(cookieParser());

// Очистка данных от угроз NoSQL
APP.use(expressMongoSanitize());

// Очистка данных от угроз XSS
APP.use(XXSSProtection());

// Request параметры в виде массива
APP.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Уменьшить тело ответа
// Использовать сжатие gzip
APP.use(compression());

// Routes initial
// APP.use('/', viewRoutes);
APP.use('/api/v1/users', userRoutes);

// TODO:
// стоит разнести все мидлваре

// TODO:
// стоит применить шаблон singleton

export = APP;
