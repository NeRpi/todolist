import React from "react";
import { Button } from "antd";

const LogoutButton = ({ onLogout }) => (
  <Button type="link" onClick={onLogout}>
    Log out
  </Button>
);

export default LogoutButton;
