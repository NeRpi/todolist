import React from "react";
import { Collapse } from "antd";
import TodoItem from "./TodoItem";
import "./Category.css";
import EditablePanel from "./EditablePanel";

const Category = ({ categories, statics }) => {
  const PanleCompenent = statics ? Collapse.Panel : EditablePanel;

  return (
    <Collapse ghost style={{ width: "80%" }}>
      {Object.keys(categories).map((category, categoryIndex) => (
        <PanleCompenent header={category} key={categoryIndex}>
          {categories[category].map((todo, todoIndex) => (
            <TodoItem todoData={todo} key={todoIndex} />
          ))}
        </PanleCompenent>
      ))}
    </Collapse>
  );
};

export default Category;
