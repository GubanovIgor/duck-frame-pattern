import React from 'react';
import './index.scss';

export const Footer = ({title, subTitle, setShowLogin}) => {
	return (
    <footer className="AuthForm-footer">
      {title}
      <div className="AuthForm-footer__bold" onClick={setShowLogin}>{subTitle}</div>
    </footer>
	);
};
