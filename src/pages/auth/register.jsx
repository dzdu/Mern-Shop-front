import React from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import './css/auth.css';

const Register = ({ history }) => {
  const [email, setEmail] = React.useState('');
  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    if (user && user.token) history.push('/');
  }, [history, user]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email) {
        toast.error('Email is required');
        return;
      }

      //    console.log('env-->', process.env.REACT_APP_REGISTER_REDIRECT_URL);
      const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };

      await auth.sendSignInLinkToEmail(email, config);
      toast.success(`Confirm email is send to ${email}, please check your inbox`);

      //save email to local storage
      window.localStorage.setItem('emailForRegistration', email);
      // clear state
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register form">
      <h1>Register</h1>

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
        <label htmlFor="register--form--button">
          <button type="submit" className="register--form--button" id="register--form--button">
            Register
          </button>
        </label>
      </form>
    </div>
  );
};

export default Register;
