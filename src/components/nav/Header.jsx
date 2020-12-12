import { Menu } from "antd";
import { HomeOutlined, LoginOutlined, SettingOutlined, UserAddOutlined } from "@ant-design/icons";
import React, { useState } from "react";

//destructuring
const { SubMenu,Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    // console.log();
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        Home
      </Item>
      <Item key="register" icon={<UserAddOutlined />} className="float-right">
        Register
      </Item>
      <Item key="login" icon={<LoginOutlined />} className="float-right">
        Login
      </Item>

      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
