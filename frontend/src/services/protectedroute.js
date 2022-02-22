// Packages
import React from 'react';
import { Route, Link } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, ...rest }) => {

  const checkValidToken = () => {
    const token = localStorage.getItem('token');
    
    // Validation logic...
  }

  return (
    <React.Fragment>
      {checkValidToken()
          ? <Route {...rest} render={props => <Component {...rest} {...props} />} />
          : <Link to="/signup" />
      }
    </React.Fragment>
  );
}

export default ProtectedRoute