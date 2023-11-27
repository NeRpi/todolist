import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./Login";
import RegisterForm from "./Registrations";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/registration"
    ) {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="auth-component">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegisterForm />} />
      </Routes>
    </div>
  );
};

export default Auth;
