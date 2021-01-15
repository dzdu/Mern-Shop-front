import React from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';
import './css/auth.css';

const RegisterComplete = ({ history }) => {
  const URL = window.location.href;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    if (user && user.token) history.push('/');
  }, [history, user]);
  React.useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(email, URL);
      if (result.user.emailVerified) {
        // TODO
        //remove user email from localStorage
        window.localStorage.removeItem('emailForRegistration');
        //get userid token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        console.log('user -->', user, 'idtokenresult -->', idTokenResult);

        createOrUpdateUser(idTokenResult.token)
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
          .catch((err) => console.log(err)); //redirect
        history.push('/');
        toast.success(`Registrations successed as ${user.email}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="register--complete form">
      <h1>Complete registration</h1>

      <form onSubmit={handleSubmit} className="register--form">
        <input type="email" name="email" id="email" required value={email} disabled />
        <br />
        <label htmlFor="Password">
          <span>Password</span>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="Enter your password"
            minLength="6"
          />
        </label>
        <br />
        <label htmlFor="register--form--button">
          <button type="submit" className="register--form--button" id="register--form--button">
            Complete registration
          </button>
        </label>
      </form>
    </div>
  );
};

export default RegisterComplete;
