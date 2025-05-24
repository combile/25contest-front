import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../component/axios";

function PublicRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get("/app-user/users");
        setIsLoggedIn(res.status === 200);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) return <div>Loading...</div>;
  if (isLoggedIn) return <Navigate to="/main" replace />;
  return children;
}

export default PublicRoute;
