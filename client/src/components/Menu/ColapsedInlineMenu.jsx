import React, { useContext, useState } from "react";
import { Layout, Button, Menu } from "antd";
import "./ColapsedInlineMenu.css";
import {
  MenuOutlined,
  ProfileOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import ProjectAddModal from "./ProjectAddModel";

const CollapsedInlineMenu = () => {
  const { store } = useContext(Context);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }

  function handleMenuClick({ key }) {
    if (key) navigate(key);
  }

  return (
    <div>
      <Layout.Sider width="15vw" className="sider" collapsed={collapsed}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{ backgroundColor: "transparent", marginTop: "10px" }}
            onClick={toggleCollapsed}
          >
            <MenuOutlined />
          </Button>
          <Button
            style={{ backgroundColor: "transparent", marginTop: "10px" }}
            onClick={() => store.logout()}
          >
            <LogoutOutlined />
          </Button>
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          collapsed={collapsed}
          onClick={handleMenuClick}
        >
          <Menu.Item
            key={""}
            icon={<PlusCircleOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить проект
          </Menu.Item>
          {store.projectList.map((val) => (
            <Menu.Item key={`/projects/${val._id}`} icon={<ProfileOutlined />}>
              {val.name}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <ProjectAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default observer(CollapsedInlineMenu);
