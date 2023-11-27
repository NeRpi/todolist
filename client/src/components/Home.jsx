import { Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import ColapsedInlineMenu from "./Menu/ColapsedInlineMenu";
import ListPage from "./Pages/ListPage";
import "../App.css";

const Home = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getTodos();
  }, [store]);

  return (
    <div className="App">
      <ColapsedInlineMenu />
      <Routes>
        <Route path="/projects/:projectId" element={<ListPage />} />
      </Routes>
    </div>
  );
};

export default Home;
