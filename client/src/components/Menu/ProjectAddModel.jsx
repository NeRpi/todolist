import React, { useContext, useState } from "react";
import { Input, Modal } from "antd";
import { Context } from "../..";

const ProjectAddModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const { store } = useContext(Context);

  const onHandleClick = () => {
    store.createProject({ name });
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
        <Input
          className="input-name"
          placeholder="Project"
          style={{ fontSize: "25px", marginTop: "30px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <hr />
      </Modal>
    </>
  );
};

export default ProjectAddModal;
