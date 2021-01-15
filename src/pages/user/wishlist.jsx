import React from 'react';
import UserNav from '../../components/nav/userNav';
import './css/user.css';
const Wishlist = () => {
  return (
    <>
      <UserNav />
      <div className="user-container">
        <h1>User wishlist</h1>
        <p>some text</p>
      </div>
    </>
  );
};

export default Wishlist;
