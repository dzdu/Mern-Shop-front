import React from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';
//import loader from '../../assets/loader.gif'
import './css/auth.css';

const Login = ({ history }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const redirectByRole = (res) => {
    if (res.data.role === 'admin') {
      history.push('/admin/dashboard');
    } else {
      history.push('/user/history');
    }
  };

  React.useEffect(() => {
    if (user && user.token) history.push('/');
  }, [history, user]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      //console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          redirectByRole(res);
        })
        .catch((err) => console.log(err));

      history.push('/');
      toast.success(`Logged in as ${user.email}`);
    } catch (error) {
      console.log(error);
      toast.error('Please enter valid email and password');
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            redirectByRole(res);
          })
          .catch((err) => console.log(err));
        toast.success(`Logged in as ${user.email}`);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <>
      {!loading ? (
        <div className="login">
          <h1>Login</h1>
          <div className="login form">
            <form onSubmit={handleSubmit} className="register--form">
              <label htmlFor="email">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </label>
              <br />
              <label htmlFor="password">
                <span>Password</span>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <Link to="/reset/password">Forgot password?</Link>
                <br />
              </label>
              <br />
              <label htmlFor="register--form--button">
                <button
                  type="submit"
                  className="register--form--button"
                  id="register--form--button"
                  onClick={handleSubmit}
                  disabled={!email || !password}>
                  <MailOutlined /> Login email and password
                </button>
              </label>
              <br />
            </form>
            <button
              type="submit"
              className="register--form--button google"
              id="register--form--button"
              onClick={googleLogin}>
              <GoogleOutlined /> Login with Google
            </button>
          </div>
        </div>
      ) : (
        <div className="loader">Loading...</div>
        // <div>
        //   <img src={loader} alt="loading..." />
        // </div>
      )}
    </>
  );
};

export default Login;
