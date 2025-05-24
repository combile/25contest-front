// 유저 검증을 위한 컴포넌트
// useEffect 로직은 추후 백엔드와 상의하며 수정이 필요함.

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../component/axios";

import Header from "../component/Header";
import Footer from "../component/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function UserValidate({ children }) {
  const [isValidToken, setIsValidToken] = useState(null);
  const navigate = useNavigate();

  const headerIsVisible = useSelector((state) => {
    return state.headerIsVisible;
  });
  const footerIsVisible = useSelector((state) => {
    return state.footerIsVisible;
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await api.get("/app-user/users");
        if (res.status === 200) {
          setIsValidToken(true);

          const path = window.location.pathname;
          const isAuthPage = ["/", "/auth", "/auth/signup"].includes(path);
          if (isAuthPage) {
            navigate("/main", { replace: true });
          }
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Token check failed:", error);
        setIsValidToken(false);
      }
    };

    checkToken();
  }, [navigate]);

  if (isValidToken === null) {
    // 로딩 컴포넌트 따로 만들어도 좋음. 이건 시간적인 여유가 있을 때 상의 필요.
    return <div>Loading...</div>;
  }

  if (!isValidToken) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      {headerIsVisible.visible ? <Header /> : null}
      {children}
      {footerIsVisible.visible ? <Footer /> : null}
    </>
  );
}

export default UserValidate;
