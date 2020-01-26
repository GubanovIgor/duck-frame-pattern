import { Get, Post } from '../../../utils/Request';

export const ApiSingup = (data) => Post('/users/signup', data);
export const ApiLogin = (data)  => Post('/users/login', data);
export const ApiLogout = ()     => Get('/users/logout', {});
export const ApiCheck = ()  => Post('/users/check', {});