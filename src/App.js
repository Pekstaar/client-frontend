import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { useDispatch } from "react-redux";
import "react-notifications/lib/notifications.css";

import Header from "./components/nav/Header";
import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import { authentication } from "./Firebase";
import { ForgotPassword } from "./pages/auth/ForgotPassword";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log(user);

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });

    // perform unsubscription clean-up
    return unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <NotificationContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </>
  );
};

export default App;
