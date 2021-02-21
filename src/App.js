import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Register,
  Login,
  Home,
  RegisterComplete,
  ResetPassword,
  History,
  PasswordUpdate,
  Wishlist,
  AdminDashboard,
  CategoryCreate,
  Product,
  SubCategory,
  Coupons,
  AllProduct,
  CategoryUpdate,
} from './pages/index.js';
import Header from './components/nav/header';
import UserRoute from './components/routes/userRoute';
import AdminRoute from './components/routes/adminRoute';

import { currentUser } from './functions/auth';

const App = () => {
  //check firebase auth state
  const dispatch = useDispatch();
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log('user', user);
        currentUser(idTokenResult.token)
          .then((res) =>
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            }),
          )
          .catch((err) => console.log(err));
      }
    });
    //clean
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/reset/password" component={ResetPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={PasswordUpdate} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/product" component={Product} />
        <AdminRoute exact path="/admin/products" component={AllProduct} />
        <AdminRoute exact path="/admin/sub" component={SubCategory} />
        <AdminRoute exact path="/admin/coupons" component={Coupons} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
      </Switch>
    </>
  );
};

export default App;
