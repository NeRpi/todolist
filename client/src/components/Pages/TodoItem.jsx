import React, { useContext, useState } from "react";
import Checkbox from "antd/es/checkbox/Checkbox";
import TodoDetailModal from "./TodoDetailModal";
import "./TodoItem.css";
import { Context } from "../..";

const TodoItem = ({ todoData, projectId, categoryId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { store } = useContext(Context);

  function cropString(str, maxLenght) {
    return str.length <= maxLenght ? str : str.substring(0, maxLenght) + "...";
  }

  const handleChecked = (checkedValue) => {
    if (checkedValue) {
      store.deleteTodo(todoData._id);
    }
  };

  return (
    <div className="todo-item">
      <Checkbox className="check-button" onChange={handleChecked} />
      <div className="todo-info" onClick={() => setIsModalOpen(true)}>
        <div className="name">{todoData.name}</div>
        <div className="description">
          {todoData.description
            ? cropString(todoData.description, 150)
            : "Описание..."}
        </div>
      </div>
      <TodoDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="edit"
        data={{ todoData, projectId, categoryId }}
      />
    </div>
  );
};

export default TodoItem;
