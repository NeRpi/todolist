import React, { useContext, useEffect, useState } from "react";
import { DatePicker, Input, Layout, Modal, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Context } from "../..";
import dayjs from "dayjs";
import "./TodoDetailModal.css";
import { autorun } from "mobx";

const TodoDetailModal = ({ isOpen, onClose, mode, data }) => {
  const { store } = useContext(Context);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(data.projectId);
  const [category, setCategory] = useState(data.categoryId);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState(4);

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (mode === "edit" && data) {
      setName(data.todoData.name || "");
      setDescription(data.todoData.description || "");
      setProject(data.projectId || "");
      setCategory(data.categoryId || "");
      setDueDate(dayjs(data.todoData.date) || null);
      setPriority(data.todoData.priority || 4);
    }
  }, [mode, data]);

  useEffect(() => {
    const disposer = autorun(() => {
      setProjects(store.projectList);
    });

    return () => {
      disposer();
    };
  }, [store]);

  useEffect(() => {
    let findProject;
    if (project) findProject = projects.find((val) => val._id === project);
    if (findProject) {
      setCategories(findProject.categories);
      if (!category) setCategory(findProject.categories[0]?._id);
    }
  }, [projects, project, category]);

  const unSetParams = () => {
    setName("");
    setDescription("");
    setPriority(4);
  };

  const onHandleClick = () => {
    if (mode === "create") {
      store.createTodo(category, {
        name,
        description,
        date: dueDate,
        priority,
        category,
      });
    } else if (mode === "edit") {
      if (data.categoryId !== category) {
        store.deleteTodo(data.todoData._id);
        store.createTodo(category, {
          name,
          description,
          date: dueDate,
          priority,
          category,
        });
      } else {
        store.updateTodo({
          id: data.todoData._id,
          name,
          description,
          date: dueDate?.add(1, "day"),
          priority,
        });
      }
    }

    onClose();
    unSetParams();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onOk={onHandleClick}
        onCancel={() => {
          onClose();
          unSetParams();
        }}
        className="todo-modal"
        width="50vw"
      >
        <Layout className="todo-layout">
          <Content className="todo-content">
            <Input
              className="input-name"
              placeholder="Todo"
              style={{ fontSize: "25px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <hr style={{ margin: "10px 0" }} />
            <Input.TextArea
              className="input-description"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Content>
          <Sider
            className="sider-addtional-settings"
            width="30%"
            style={{ backgroundColor: "rgba(0, 30, 60)" }}
          >
            <span>Проект</span>
            <Select
              value={project}
              style={{ width: "100%" }}
              onChange={(value) => setProject(value)}
              options={projects.map((val) => {
                return { label: val.name, value: val._id };
              })}
            />
            <hr />
            <span>Раздел</span>
            <Select
              value={category}
              style={{ width: "100%" }}
              onChange={(value) => setCategory(value)}
              options={categories.map((val, index) => {
                return { label: val.name, value: val._id };
              })}
            />
            <hr />
            <div>Срок выполнения</div>
            <DatePicker
              disabledTime={true}
              value={dueDate}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                color: "white",
              }}
              onChange={(date) => setDueDate(date)}
            />
            <hr />
            <div>Приоритет</div>
            <Select
              value={priority}
              style={{ width: "100%" }}
              onChange={(value) => setPriority(value)}
              options={[
                { value: 1, label: "Приоритет 1" },
                { value: 2, label: "Приоритет 2" },
                { value: 3, label: "Приоритет 3" },
                { value: 4, label: "Приоритет 4" },
              ]}
            />
          </Sider>
        </Layout>
      </Modal>
    </>
  );
};

export default TodoDetailModal;
