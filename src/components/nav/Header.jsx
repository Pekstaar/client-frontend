import { Menu } from "antd";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");

  const handleClick = () => {
    console.log();
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<MailOutlined />}>
        Home
      </Menu.Item>

      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Register">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default Header;
