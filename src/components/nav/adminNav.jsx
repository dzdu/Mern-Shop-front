import React from 'react';
import { Link } from 'react-router-dom';
import './adminNav.css';

const AdminNav = () => {
  return (
    <div>
      <nav className="admin_nav">
        <ul className="admin_nav--ul">
          <li className="admin_nav--ul--li">
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="admin_nav--ul--li">
            <Link to="/admin/product">Product</Link>
          </li>
          <li className="admin_nav--ul--li">
            <Link to="/admin/products">All products</Link>
          </li>
          <li className="admin_nav--ul--li">
            <Link to="/admin/category">Category</Link>
          </li>
          <li className="admin_nav--ul--li">
            <Link to="/admin/sub">Sub-Category</Link>
          </li>
          <li className="admin_nav--ul--li">
            <Link to="/admin/coupons">Coupons</Link>
          </li>
          <li className="admin_nav--ul--li">
            <Link to="/user/password">Password</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;
