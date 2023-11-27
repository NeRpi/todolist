import React from "react";
import { Collapse } from "antd";
import TodoItem from "./TodoItem";
import "./Category.css";

const DateCategory = ({ dates }) => {
  return (
    <Collapse ghost style={{ width: "80%" }}>
      {Object.keys(dates).map((date) => (
        <Collapse.Panel header={date} key={date}>
          {dates[date].map((todo) => (
            <TodoItem todoData={todo} key={todo._id} />
          ))}
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default DateCategory;
