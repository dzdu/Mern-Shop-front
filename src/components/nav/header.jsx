import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import React from 'react';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = React.useState('home');
  React.useEffect(() => {}, []);
  const dispatch = useDispatch();
  const histroy = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGGED_OUT_USER',
      payload: null,
    });
    histroy.push('/login');
  };

  return (
    <div className="container">
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="menu">
        <Item key="home" icon={<HomeOutlined />} className="menu--home">
          <Link to="/">Home</Link>
        </Item>
        <div className="menu--search">
          <input type="text" key="search" placeholder="Search" />
        </div>

        {!user ? (
          <>
            <Item key="login" icon={<UserOutlined />}>
              <Link to="/login">Login</Link>
            </Item>
            <Item key="register" icon={<UserAddOutlined />}>
              <Link to="/register">Register</Link>
            </Item>
          </>
        ) : (
          <SubMenu
            key="SubMenu"
            icon={<AppstoreOutlined />}
            title={user.email && user.email.split('@')[0]}>
            <Item key="setting:1">
              <Link to="/user/history">Profile</Link>
            </Item>
            <Item key="setting:2">Opt 2</Item>
            <Item key="setting:3" onClick={logout} icon={<UserDeleteOutlined />}>
              Log out
            </Item>
          </SubMenu>
        )}
      </Menu>
    </div>
  );
};

export default Header;
