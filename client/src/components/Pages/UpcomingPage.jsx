import React, { useContext, useEffect } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import DateCategory from "./DateCategory";
import "./UpcomingPage.css";

const UpcomingPage = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getUpcoming();
  });

  return (
    <div key={"upcoming"} className="upcoming-page">
      <header className="header-list">
        <h1>Предстоящие</h1>
      </header>
      <DateCategory dates={store.updcomingList} />
    </div>
  );
});

export default UpcomingPage;
