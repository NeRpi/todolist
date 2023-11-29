import { createStackNavigator } from "@react-navigation/stack";
import { useContext, useEffect } from "react";

import MenuPage from "./Pages/MenuPage";
import ProjectPage from "./Pages/ProjectPage";
import TodoPage from "./Pages/TodoPage";
import { Context } from "../App";

const Stack = createStackNavigator();

const Home = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getTodos();
  }, [store]);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Menu"
        component={MenuPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Project"
        component={ProjectPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Todo"
        component={TodoPage}
      />
    </Stack.Navigator>
  );
};

export default Home;
