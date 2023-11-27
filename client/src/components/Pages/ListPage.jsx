import React, { useContext, useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "antd";
import { Context } from "../..";
import TodoDetailModal from "./TodoDetailModal";
import CategoryAddModal from "./CategoryAddModel";
import Category from "./Category";

import "./ListPage.css";
import { observer } from "mobx-react-lite";

const ListPage = observer(() => {
  const { store } = useContext(Context);

  const [isTodo, setIsTodo] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const [project, setProject] = useState({});
  const [title, setTitle] = useState(project.name || "");

  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    store
      .getProject(projectId)
      .then((response) => {
        if (response && response.data) setProject(response.data);
        else navigate("/");
      })
      .catch(() => navigate("/"));
  }, [store, projectId, store.projectList, navigate]);

  useEffect(() => {
    setBtnVisible(title !== project.name);
  }, [title, project]);

  useEffect(() => {
    setTitle(project.name);
  }, [project]);

  const onClickUpdate = (e) => {
    e.stopPropagation();
    setProject({ ...project, name: title });
    store.updateProject({
      ...project,
      id: project._id,
      name: title,
    });
  };

  const onHandleInput = (e) => {
    setTitle(e.target.value);
    setBtnVisible(e.target.value !== project.name);
  };

  return (
    <div key={projectId} className="list-page">
      <header className="header-list">
        <div className="header-content">
          <Input
            style={{ margin: "10px 0px" }}
            value={title}
            onChange={onHandleInput}
            onClick={(e) => e.stopPropagation()}
          />
          <Button
            style={{
              margin: "5px",
              visibility: btnVisible ? "visible" : "hidden",
              width: "50px",
            }}
            icon={<CheckOutlined />}
            onClick={onClickUpdate}
          />
          <Button
            style={{
              visibility: btnVisible ? "visible" : "hidden",
              width: "50px",
            }}
            icon={<CloseOutlined />}
            onClick={(e) => {
              setTitle(project.name);
              e.stopPropagation();
            }}
          />
          <Button style={{ margin: "0 5px" }} onClick={() => setIsTodo(true)}>
            Добавить задачу
          </Button>
          <Button onClick={() => setIsCategory(true)}>Добавить раздел</Button>
        </div>
      </header>
      <Category categories={project.categories} projectId={projectId} />
      <TodoDetailModal
        isOpen={isTodo}
        onClose={() => setIsTodo(false)}
        data={{ projectId }}
        mode="create"
      />
      <CategoryAddModal
        isOpen={isCategory}
        onClose={() => setIsCategory(false)}
        projectId={projectId}
      />
    </div>
  );
});

export default ListPage;
