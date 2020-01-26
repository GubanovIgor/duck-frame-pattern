import 'antd/dist/antd.css';
import { useRoutes } from '../../routes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../../features/Auth/duck';

const mapStateToProps = (state) => { return { 
  checkStatus: state.auth.check.status,
  loginStatus: state.auth.user.status,
  logoutStatus: state.auth.logout.status,
} };
const mapDispatchToProps = dispatch => bindActionCreators(duck.actions, dispatch);

const isAuthenticated = (checkStatus, loginStatus, logoutStatus) => {
  if (logoutStatus === 'success') {
    return false;
  } else if (loginStatus === 'success' || checkStatus === 'success') {
    return true;
  } else {
    return false;
  }
}

const App = ({checkStatus, loginStatus, logoutStatus}) => {
  return useRoutes(isAuthenticated(checkStatus, loginStatus, logoutStatus));
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
