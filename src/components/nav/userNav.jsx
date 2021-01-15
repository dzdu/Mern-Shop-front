import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const UserNav = () => {
  return (
    <div>
      <nav className="user_nav">
        <ul className="user_nav--ul">
          <li className="user_nav--ul--li">
            <Link to="/user/history">History</Link>
          </li>
          <li className="user_nav--ul--li">
            <Link to="/user/password">Password</Link>
          </li>
          <li className="user_nav--ul--li">
            <Link to="/user/wishlist">Wishlist</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNav;
