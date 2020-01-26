import React from 'react';
import './index.scss';

const DOT_VALUE = 4;

const Loader = () => {
	const dotRender = (value) => {
		const dots = []
		for (let i = 0; i < value; i++) {
			dots.push(<div className="App-loader__dot" key={i}><div className="App-loader__inner"/></div>)
		}
		return dots
	}
	return (<div className="App-loader-wrapper">
    <div className="App-loader"> 
      {dotRender(DOT_VALUE)}
    </div>
  </div>);
};

export default Loader;