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
import { currentUser } from "./functions/auth";
import { History } from "./pages/History";
import { UserRoute } from "./components/routes/UserRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    // perform unsubscription clean-up
    return () => unsubscribe();
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
        <UserRoute exact path="/user/history" component={History} />
        {/* conditioned private route */}
      </Switch>
    </>
  );
};

export default App;
