// Класс обработки ошибок
// возвращает удобочитаемый лог ошибок
// статус ошибки, ее тип, метод, в котором была поймана ошибка
class CustomError extends Error {
  public statusCode: number;
  public status: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error()).stack;
    }
    // captureStackTrace - записывает в объект this (текущий объект ошибки) стек вызовов
    // второй аргумент - this.constructor говорит о том, что функции стои остановиться
  }
}

const appError = (statusCode: number, message: string) => {
  const custumError = new CustomError(statusCode, message);
  let resError: any;
  if (custumError.statusCode && custumError.status && custumError.message) {
    resError = {
      message: custumError.message,
      statusCode: custumError.statusCode,
      status: custumError.status,
    };
  }
  return resError;
};

export { CustomError, appError };
