import React from 'react';
import { Button, Input, Icon } from 'antd';
import { TooltipInput } from '../Tooltip';
import './index.scss';

const Login = ({ApiLogin}) => {
	return (
		<div className='LoginForm'>
			<div className="LoginForm__input-holder">
				<Input
					placeholder="E-mail"
					prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
					suffix={<TooltipInput/>}
				/>
			</div>
			<div className="LoginForm__input-holder">
				<Input.Password
					prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="input password"
				/>
			</div>
			<Button
				type='primary'
				shape='round'
				onClick={() => {ApiLogin({
					"email": "testssssааа3@mail.ru",
					"password": "12345678"
				})}}
			>
				Войти
				<Icon type="login" style={{ color: '#fff' }} />
			</Button>
		</div>
	);
};
export default Login;
