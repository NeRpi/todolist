import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import "./Login.css";

const RegisterForm = ({ onFinish }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { store } = useContext(Context);

  const navigate = useNavigate();

  const onLogin = () => {
    store.registration(username, password);
  };

  return (
    <Form className="login-form" onFinish={onFinish}>
      <div className="login-header">Registretion</div>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          onChange={(e) => setUsername(e.target.value)}
          prefix={<UserOutlined />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          prefix={<LockOutlined />}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item className="buttons">
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button type="primary" htmlType="submit" onClick={onLogin}>
          Registration
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
