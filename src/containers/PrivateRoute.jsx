import React, { lazy, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Redirectpage from './pages/RedirectPage';
import { resetUser } from '../actions/user';
import { userLogout } from '../actions/auth';

const App = lazy(() => import('./App'));

const PrivateRoute = ({
  component: Component,
  location,
  userStore,
  resetUser,
  userLogout,
  ...rest
}) => {
  const history = useHistory();
  const accessToken = localStorage.getItem('AccessToken');
  const profileFetched = localStorage.getItem('profileFetched');


const access= userStore?.userProfile?.data?.access;

  useEffect(() => {
   
    if (userStore.hasErrors && userStore.hasErrors.code === 401) {
      localStorage.removeItem('AccessToken');
      resetUser();
      userLogout();
      // history.push('/login');
    }
  }, [userStore.hasErrors]);
   
  if (location.pathname === '/') {
    return <Redirect to="/dashboard" />;
  }
return <Route render={() => <Component {...rest} />} />;
};

const mapStateToProps = state => {
  return {
    userStore: state.userStore,
  };
};

const mapDispatchToProps = {
  userLogout,
  resetUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
