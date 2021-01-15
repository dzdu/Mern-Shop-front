import React from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import './css/auth.css';

const ResetPassword = ({ history }) => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    if (user && user.token) history.push('/');
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        history.push('/login');
        toast.success(
          `Email with "reset password" link has been sent to ${email}, please check your inbox`,
        );
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message + ' Please, enter valid email address!');
        console.log(err);
      });
  };

  return (
    <>
      {!loading ? (
        <div className="register form">
          <h1>Reset your password</h1>
          <form onSubmit={handleSubmit} className="register--form">
            <label htmlFor="email">
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
            <label htmlFor="register--form--button">
              <button
                type="submit"
                className="register--form--button"
                id="register--form--button"
                disabled={!email}>
                Reset password
              </button>
            </label>
          </form>
        </div>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </>
  );
};

export default ResetPassword;
