import React, { useState } from "react";
import { Button, Input } from "antd";
import { authentication } from "../../Firebase";
import { SendOutlined } from "@ant-design/icons";

// const { Password } = Input;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        style={{ height: "3.5em" }}
        type="email"
        placeholder="Enter your email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <Input.Password
        style={{ height: "3.5em" }}
        placeholder="Input your Password"
        className="form-control my-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* <button type="submit" className="btn btn-raised btn-secondary m-2">
        Login
      </button> */}
      <Button
        type="primary submit"
        size="large"
        onClick={handleSubmit}
        block
        shape="round"
        icon={<SendOutlined />}
        disabled={!email || password.length < 6}
      >
        Login
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h5 className="float-center mx-3">SIGN-IN</h5>
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
