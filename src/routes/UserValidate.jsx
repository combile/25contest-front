// 유저 검증을 위한 컴포넌트
// useEffect 로직은 추후 백엔드와 상의하며 수정이 필요함.

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function UserValidate({ children }) {
  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    // const checkToken = async () => {
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     setIsValidToken(false);
    //     return;
    //   }
    //   try {
    //     await axios.get("/api/check-token", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setIsValidToken(true);
    //   } catch (error) {
    //     console.error("Token invalid:", error);
    //     setIsValidToken(false);
    //   }
    // };
    // checkToken();
  }, []);

  if (isValidToken === null) {
    // 로딩 컴포넌트 따로 만들어도 좋음. 이건 시간적인 여유가 있을 때 상의 필요.
    return <div>Loading...</div>;
  }

  if (!isValidToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default UserValidate;
