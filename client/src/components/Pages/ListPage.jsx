import React, { useContext, useEffect, useState } from "react";
import "./ListPage.css";
import TodoDetailModal from "./TodoDetailModal";
import Category from "./Category";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import { autorun } from "mobx";
import { Context } from "../..";

const ListPage = () => {
  const { store } = useContext(Context);
  const [categories, setCategories] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projectName } = useParams();

  const generateCategories = (projects) => {
    if (!projects) return {};

    return projects.reduce((acc, project) => {
      const { category } = project;

      if (category) {
        acc[category] = acc[category] || [];
        acc[category].push(project);
      }

      return acc;
    }, {});
  };

  useEffect(() => {
    const disposer = autorun(() => {
      const updateTodos = store.projectList[projectName];
      setCategories(generateCategories(updateTodos));
    });

    return () => {
      disposer();
    };
  }, [store, projectName]);

  return (
    <div className="list-page">
      <header className="header-list">
        <h2>{projectName}</h2>
        <div className="add-buttons">
          <Button onClick={() => setIsModalOpen(true)}>Добавить задачу</Button>
          <Button>Добавить раздел</Button>
        </div>
      </header>
      <Category categories={categories} />
      <TodoDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
      />
    </div>
  );
};

export default ListPage;
