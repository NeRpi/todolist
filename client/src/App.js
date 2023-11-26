import { Route, Routes } from "react-router-dom";
import ColapsedInlineMenu from "./components/Menu/ColapsedInlineMenu";
import ListPage from "./components/Pages/ListPage";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "./index";
import StaticPage from "./components/Pages/StaticPage";
import { autorun } from "mobx";

function App() {
  const [incomingList, setIncomingList] = useState({});
  const [upcomingList, setUpcomingList] = useState({});
  const [dailyList, setDailyList] = useState({});
  const { store } = useContext(Context);

  useEffect(() => {
    store.getTodos();
  }, [store]);

  useEffect(() => {
    const disposer = autorun(() => {
      setIncomingList(store.incomingList);
      setUpcomingList(store.upcomingList);
      setDailyList(store.daylyList);
    });

    return () => {
      disposer();
    };
  }, [store, store.incomingList, store.upcomingList, store.daylyList]);

  return (
    <div className="App">
      <ColapsedInlineMenu />
      <Routes>
        <Route
          path="/"
          element={<StaticPage title="Входящие" categories={incomingList} />}
        />
        <Route
          path="/today"
          element={<StaticPage title="Сегодня" categories={dailyList} />}
        />
        <Route
          path="/upcoming"
          element={<StaticPage title="Предстоящие" categories={upcomingList} />}
        />
        <Route path="/projects/:projectName" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default App;
