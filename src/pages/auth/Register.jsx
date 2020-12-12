import React, { useState } from "react";
import { Input } from "antd";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  const registerForm = () => (
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
      
      <button type="submit" className="btn btn-raised btn-secondary m-2">Register</button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h5>SIGN-UP</h5>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
