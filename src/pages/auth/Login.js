import React, { useState } from "react";
import { Button, Input } from "antd";
import { authentication } from "../../Firebase";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import NotificationManager from "react-notifications/lib/NotificationManager";

// const { Password } = Input;

const Login = ({ history }) => {
  const [email, setEmail] = useState("pekstaar@gmail.com");
  const [password, setPassword] = useState("passwad");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authentication.signInWithEmailAndPassword(
        email,
        password
      );
      const { user } = result;
      // console.log(result);
      // react dispense
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      NotificationManager.error(error.message);
      setLoading(false);
    }
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
