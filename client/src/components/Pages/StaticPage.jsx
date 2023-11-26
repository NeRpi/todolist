import React, { useEffect, useState } from "react";
import "./ListPage.css";
import TodoDetailModal from "./TodoDetailModal";
import Category from "./Category";
import { Button } from "antd";

const StaticPage = ({ title, categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategories, setNewCategories] = useState();

  useEffect(() => {
    setNewCategories(categories);
  }, [categories]);

  return (
    <div className="list-page">
      <header className="header-list">
        <h2>{title}</h2>
        <div className="add-buttons">
          <Button onClick={() => setIsModalOpen(true)}>Добавить задачу</Button>
          <Button>Добавить раздел</Button>
        </div>
      </header>
      <Category statics={true} categories={categories} mode="static" />
      <TodoDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
      />
    </div>
  );
};

export default StaticPage;
