import 'antd/dist/antd.css';
import './containers/App.css';
import './index.css';

import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router';
import { store } from './redux/store/index';
import PrivateRoute from './containers/PrivateRoute';
import RedirectPage from './containers/pages/RedirectPage';
import ForgotPassword from './containers/pages/ForgotPassword';
import VerifyAuthCode from './containers/pages/VerifyAuthCode';
import VerifyAuthMasterCode from './containers/pages/VerifyAuthMasterCode';
import GoogleCallBack from './containers/pages/GoogleCallBack';

const history = createBrowserHistory();
const previousPath = history.location.pathname;

const App = lazy(() => import('./containers/App'));
const Login = lazy(() => import('./containers/pages/Login'));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Suspense fallback={<RedirectPage />}>
        <Switch>
          <Route
            exact
            path="/login"
            render={props => <Login {...props} previousPath={previousPath} />}
          />
          <Route
            exact
            path="/forgot-password"
            render={props => <ForgotPassword {...props} />}
          />
          <Route
            exact
            path="/callback/google"
            render={props => <GoogleCallBack {...props} />}
          />

          <Route
            exact
            path="/verify-code"
            render={props => <VerifyAuthCode {...props} />}
          />

          <Route
            exact
            path="/verify-master-code"
            render={props => <VerifyAuthMasterCode {...props} />}
          />

          <PrivateRoute path="/" component={App} />
        </Switch>
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById('root')
);
