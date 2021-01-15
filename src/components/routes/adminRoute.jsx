import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import '../../pages/auth/css/auth.css';
import LoadingRedirect from './LoadingRedirect';
import { currentAdmin } from '../../functions/auth';
import { toast } from 'react-toastify';

const AdminRoute = ({ chlidren, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = React.useState(false);

  React.useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log('CURRENT ADMIN RES', res);
          setOk(true);
        })
        .catch((err) => {
          console.log('ADMIN ROUTE ERR', err);
          setOk(false);
          toast.error(err.message);
        });
    }
  }, [user]);

  return ok ? (
    <Route {...rest} />
  ) : (
    <>
      {/* <div className="loader">Loading...</div> */}
      <LoadingRedirect />
    </>
  );
};

export default AdminRoute;
