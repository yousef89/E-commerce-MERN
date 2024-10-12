import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return <Outlet />;
}
