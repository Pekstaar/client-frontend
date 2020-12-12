import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { authentication } from "../../Firebase";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("registrationEmail"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        style={{ height: "3.5em" }}
        // type="email"
        className="form-control"
        value={email}
        disabled
      />

      <Input
        style={{ height: "3.5em" }}
        type="password"
        placeholder="Input Password"
        className="form-control my-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />

      <button type="submit" className="btn btn-raised btn-secondary m-2">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h5>Complete Signup </h5>
          <NotificationContainer />
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
