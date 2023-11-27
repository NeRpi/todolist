import { Navigate, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../index";
import ColapsedInlineMenu from "./Menu/ColapsedInlineMenu";
import ListPage from "./Pages/ListPage";
import "../App.css";
import UpcomingPage from "./Pages/UpcomingPage";

const Home = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getTodos();
  }, [store]);

  return (
    <div className="App">
      <ColapsedInlineMenu />
      <Routes>
        <Route path="/" element={<UpcomingPage />} />
        <Route path="/projects/:projectId" element={<ListPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Home;
