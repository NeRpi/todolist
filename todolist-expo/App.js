import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { createContext, useContext, useEffect } from "react";

import Auth from "./components/Auth/Auth";
import Home from "./components/Home";
import Store from "./store/store";

const store = new Store();
const Stack = createStackNavigator();

export const Context = createContext({ store });

const App = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (AsyncStorage.getItem("token")) store.checkAuth();
  }, [store]);

  return (
    <Context.Provider value={{ store }}>
      <NavigationContainer>
        {store.isAuth ? (
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Auth"
              component={Auth}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Context.Provider>
  );
});

export default App;
