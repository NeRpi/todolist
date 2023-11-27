import React, { useContext } from "react";
import { Collapse } from "antd";
import TodoItem from "./TodoItem";
import "./Category.css";
import EditablePanel from "./EditablePanel";
import { Context } from "../..";

const Category = ({ categories, projectId }) => {
  const { store } = useContext(Context);

  const onCategoryUpdate = (data) => {
    store.updateCategory(data);
  };

  const onCategoryDelete = (data) => {
    store.deleteCategory(data);
  };

  return (
    <Collapse ghost style={{ width: "80%" }}>
      {categories?.map((category) => (
        <EditablePanel
          category={category}
          key={category._id}
          onCategoryUpdate={onCategoryUpdate}
          onCategoryDelete={onCategoryDelete}
        >
          {category.todos.map((todo) => (
            <TodoItem
              todoData={todo}
              key={todo._id}
              projectId={projectId}
              categoryId={category._id}
            />
          ))}
        </EditablePanel>
      ))}
    </Collapse>
  );
};

export default Category;
