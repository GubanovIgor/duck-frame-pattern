import React from 'react';
import { Typography } from 'antd';

export const Header = ({title}) => {
	return (
    <header>
      <Typography.Title>{title}</Typography.Title>
    </header>
	);
};
