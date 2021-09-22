import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function AuthTokenHOC(WrappedComponent) {
  return props => {
    const history = useHistory();
    useEffect(() => {
      const accessToken = localStorage.getItem('AccessToken');
      if (accessToken === null || accessToken === undefined) {
        history.replace('/login');
      }
    });

    return (
      // Wraps the input component in a container, without mutating it.
      <WrappedComponent {...props} />
    );
  };
}

export default AuthTokenHOC;
