import React, { useContext, useEffect, useState } from "react";
import { Layout, Button, Menu } from "antd";
import "./ColapsedInlineMenu.css";
import {
  CalendarOutlined,
  InboxOutlined,
  ScheduleOutlined,
  ProjectOutlined,
  MenuOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { autorun } from "mobx";

const CollapsedInlineMenu = () => {
  const { store } = useContext(Context);
  const [collapsed, setCollapsed] = useState(false);
  const [items, setItems] = useState([
    { label: "Входящие", key: "/", icon: <InboxOutlined /> },
    { label: "Сегодня", key: "/today", icon: <ScheduleOutlined /> },
    { label: "Предстоящие", key: "/upcoming", icon: <CalendarOutlined /> },
    {
      label: "Мои проекты",
      key: "projects",
      icon: <ProjectOutlined />,
      children: [],
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const disposer = autorun(() => {
      const newItems = [
        ...items.slice(0, -1),
        {
          label: "Мои проекты",
          key: "projects",
          icon: <ProjectOutlined />,
          children: Object.keys(store.projectList).map((val) => ({
            label: val,
            key: `/projects/${val}`,
            icon: <ProfileOutlined />,
          })),
        },
      ];
      setItems(newItems);
    });

    return () => {
      disposer();
    };
  }, [store]);

  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }

  function handleMenuClick({ key }) {
    if (key) navigate(key);
  }

  return (
    <Layout.Sider width="15vw" className="sider" collapsed={collapsed}>
      <div style={{ textAlign: "center" }}>
        <Button
          style={{ backgroundColor: "transparent", marginTop: "10px" }}
          onClick={toggleCollapsed}
        >
          <MenuOutlined />
        </Button>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        collapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
      />
    </Layout.Sider>
  );
};

export default CollapsedInlineMenu;
