import React from 'react';
import UserNav from '../../components/nav/userNav';
import './css/user.css';
const History = () => {
  return (
    <>
      <UserNav />
      <div className="user-container history">
        <h1>User History</h1>
        <p>some text</p>
      </div>
    </>
  );
};

export default History;
