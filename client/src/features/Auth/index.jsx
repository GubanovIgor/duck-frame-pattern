import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from './duck';
import AuthForm from './ui/components';
import Loader from '../../components/Loader';


const mapStateToProps = (state) => { return { checkStatus: state.auth.check.status } };
const mapDispatchToProps = dispatch => bindActionCreators(duck.actions, dispatch);

const Auth = ({checkStatus, checkAction, loginAction, registrateAction}) => {
  useEffect(() => { checkAction(); }, []);
	const ApiLogin = (data) => loginAction(data);
	const ApiRegistrate = (data) => registrateAction(data);
	if(checkStatus === 'loading') return <Loader/>;
	return <AuthForm ApiLogin={ApiLogin} ApiRegistrate={ApiRegistrate}/>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
