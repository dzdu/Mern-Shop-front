import React from 'react';
import UserNav from '../../components/nav/userNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import './css/user.css';
const PasswordUpdate = () => {
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword('');
        toast.success('Password has been updated');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <>
      <UserNav />
      {!loading ? (
        <div className="form">
          <h1>Update Password</h1>
          <form onSubmit={handleSubmit} className="update--form">
            <label htmlFor="password">
              <span>Enter your new password</span>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="6"
                disabled={loading}
              />
            </label>
            <br />
            <button disabled={!password || password.length < 6} className="update--form--button">
              {' '}
              Update password{' '}
            </button>
            <br />
          </form>
        </div>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </>
  );
};

export default PasswordUpdate;
