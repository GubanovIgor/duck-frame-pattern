import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import { Header } from './Header';
import { Footer } from './Footer';
import './index.scss';

const AuthForm = ({ ApiLogin, ApiRegistrate }) => {
  const [showLogin, setShowLogin] = useState(true);

  let titleHeader = "Вход";
  let titleFooter = "Нет аккаунта?";
  let subTitleFooter = "Зарегистрироваться";

  if(!showLogin) {
    titleHeader = "Регистрация";
    titleFooter = "Уже есть аккаунт?";
    subTitleFooter = "Войти";
  }

	return (
    <div className="AuthPage">
      <div className="AuthForm">
        <div className="AuthForm__wrapper">
          <div className="AuthForm__image-block"/>
          <div className="AuthForm__form-block">
            <Header title={titleHeader}/>
            { showLogin ? <Login ApiLogin={ApiLogin}/> : <Register ApiRegistrate={ApiRegistrate}/> }
            <Footer
              title={titleFooter}
              subTitle={subTitleFooter}
              setShowLogin={() => {setShowLogin(!showLogin)}}
            />
          </div>
        </div>
      </div>
    </div>
	);
};
export default AuthForm;
