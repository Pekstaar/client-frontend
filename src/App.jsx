import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register.js";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Header />
      <NotificationContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
      </Switch>
    </>
  );
};

export default App;
