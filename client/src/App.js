import { useContext, useEffect } from "react";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home";
import "./App.css";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  return <>{store.isAuth ? <Home /> : <Auth />}</>;
}

export default observer(App);
