import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";

import Login from "./Login";
import Registration from "./Registration";
import { Context } from "../../App";

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
