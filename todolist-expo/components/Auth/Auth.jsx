import React, { useContext, useState } from "react";
import { Context } from "../../App";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Registration from "./Registration";
import Logout from "./Logout";

const Stack = createStackNavigator();

const Auth = () => {
  const { store } = useContext(Context);

  const handleLogin = (username, password) => {
    store.login(username, password);
  };

  const handleRegistration = (username, password) => {
    store.registration(username, password);
  };

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <Login onLogin={handleLogin} />}
      </Stack.Screen>
      <Stack.Screen name="Register" options={{ headerShown: false }}>
        {(props) => <Registration onRegister={handleRegistration} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Auth;
