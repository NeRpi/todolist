import React, { useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
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
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default Auth;
