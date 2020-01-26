import React from 'react';
import { Button, Input, Icon } from 'antd';
import { TooltipInput } from '../Tooltip';
import './index.scss';

const Register = ({ApiRegistrate}) => {
	return (
		<div className='RegisterForm'>
			<div className="RegisterForm__input-holder">
				<Input
					placeholder="Имя"
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					suffix={<TooltipInput/>}
				/>
			</div>
			<div className="RegisterForm__input-holder">
				<Input
					placeholder="Фамилия"
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					suffix={<TooltipInput/>}
				/>
			</div>
			<div className="RegisterForm__input-holder">
				<Input
					placeholder="E-mail"
					prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
					suffix={<TooltipInput/>}
				/>
			</div>
			<div className="RegisterForm__input-holder">
				<Input.Password
					prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="Пароль"
				/>
			</div>
			<div className="RegisterForm__input-holder">
				<Input.Password
					prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="Повторите пароль"
				/>
			</div>
			<Button
				type='primary'
				shape='round'
				onClick={() => {ApiRegistrate({
					"name": "test",
					"email": "testssssааа4sss@mail.ru",
					"password": "12345678",
					"passwordConfirm": "12345678"
				})}}
			>
				Зарегистрироваться
			</Button>
		</div>
	);
};
export default Register;
