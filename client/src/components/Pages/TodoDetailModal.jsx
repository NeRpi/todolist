import React, { useContext, useEffect, useState } from "react";
import { DatePicker, Input, Layout, Modal, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Context } from "../..";
import dayjs from "dayjs";
import "./TodoDetailModal.css";
import { autorun } from "mobx";

const TodoDetailModal = ({ isOpen, onClose, mode, data }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(1);
  const [category, setCategory] = useState(1);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState(4);

  const [projects, setProjects] = useState({});
  const [categories, setCategories] = useState([]);

  const { store } = useContext(Context);

  useEffect(() => {
    if (mode === "edit" && data) {
      setName(data.name || "");
      setDescription(data.description || "");
      setProject(data.project || "");
      setCategory(data.category || "");
      setDueDate(dayjs(data.date) || null);
      setPriority(data.priority || 1);
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
    if (projects[project]) setCategories(Object.keys(projects[project]));
  }, [projects, project]);

  const onHandleClick = () => {
    if (mode === "create") {
      store.createTodo({ name, description, project, dueDate, priority });
    } else if (mode === "edit") {
      store.updateTodo({
        id: data._id,
        name,
        description,
        project,
        category,
        date: dueDate,
        priority,
      });
    }

    onClose();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onOk={onHandleClick}
        onCancel={onClose}
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
              options={[
                { label: "Входящие", value: "" },
                ...Object.keys(projects).map((val) => {
                  return { label: val, value: val };
                }),
              ]}
            />
            <hr />
            <span>Раздел</span>
            <Select
              value={category}
              style={{ width: "100%" }}
              onChange={(value) => setCategory(value)}
              options={categories.map((val, index) => {
                return { label: val, value: index };
              })}
            />
            <hr />
            <div>Срок выполнения</div>
            <DatePicker
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
