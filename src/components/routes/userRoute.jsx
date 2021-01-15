import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import '../../pages/auth/css/auth.css';
import LoadingRedirect from './LoadingRedirect';

const UserRoute = ({ chlidren, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} />
  ) : (
    <>
      {/* <div className="loader">Loading...</div> */}
      <h1>You have to login first</h1>
      <LoadingRedirect />
    </>
  );
};

export default UserRoute;
