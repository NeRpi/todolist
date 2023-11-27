import React, { useContext, useState } from "react";
import { Input, Modal } from "antd";
import { Context } from "../..";

const CategoryAddModal = ({ isOpen, onClose, projectId }) => {
  const [name, setName] = useState("");
  const { store } = useContext(Context);

  const onHandleClick = () => {
    store.createCategory(projectId, { name });
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onOk={onHandleClick}
      onCancel={onClose}
      className="todo-modal"
      width="50vw"
    >
      <Input
        className="input-name"
        placeholder="Category"
        style={{ fontSize: "25px", marginTop: "30px" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <hr />
    </Modal>
  );
};

export default CategoryAddModal;
