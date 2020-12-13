import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//destructuring
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    // console.log();
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();

    dispatch({
      type: "LOGOUT",
      payload: null, //make state empty
    });

    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home </Link>
      </Item>

      {!user && ( // REGISTER navbar selection (displays if not signed in)
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && ( // LOGIN nav bar selection( displays if not signed in)
        <Item key="login" icon={<LoginOutlined />} className="float-right">
          <Link to="/login">Login </Link>
        </Item>
      )}

      {user && ( // if user is signed in, display username part
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]} // split email at the @ and grab the first item(username part)
          className="float-right"
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
