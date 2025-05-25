import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignUpPage";
import api from "../component/axios";

import scss from "../styles/scss/AuthPage.module.scss";

import "../styles/styledComponents/GlobalStyle.jsx";
import * as colors from "../component/colorConstants";

import { useDispatch } from "react-redux";

const TabMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  position: relative;
  border-bottom: 1px solid ${colors.dark0Color};
  width: 90%;
  max-width: 380px;

  .tab {
    font-family: "SFProDispayRegular";
    font-size: 14px;
    text-align: center;
    padding: 15px 60px;
    font-weight: bold;
    color: #363636;
    position: relative;

    &.active {
      color: ${colors.blueColor};
    }

    &.active::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: ${colors.blueColor};
    }
  }
`;

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const setUserInfo = (userInfo) => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        username: userInfo.username,
        views: userInfo.views,
        vocaLevel: userInfo.vocabularyLevel,
      })
    );

    console.log("Redux 및 localStorage 저장 완료");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
      const response = await api.post("/auth/login", {
        loginId: email,
        password: password,
      });

      const accessToken = response.headers["authorization"]?.split(" ")[1];

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);

        try {
          const userInfoRes = await api.get("/app-user/users");
          setUserInfo(userInfoRes.data);

          // alert('로그인 성공!');
          navigate("/main");
        } catch (userErr) {
          console.error(
            "유저 정보 불러오기 실패:",
            userErr.response?.data || userErr.message
          );
          // alert("로그인 성공했지만 유저 정보 불러오기 실패");
        }
      } else {
        setPasswordError("로그인 실패: 토큰이 없습니다.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setEmailError("아이디가 틀렸습니다");
        setPasswordError("비밀번호를 다시 한번 확인해 주세요.");
      } else {
        setPasswordError("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={scss.authWrapper}>
      <TabMenu>
        <div
          className={`tab ${tab === "signup" ? "active" : ""}`}
          onClick={() => setTab("signup")}
        >
          회원가입
        </div>
        <div
          className={`tab ${tab === "login" ? "active" : ""}`}
          onClick={() => setTab("login")}
        >
          로그인
        </div>
      </TabMenu>

      {tab === "login" ? (
        <LoginPage
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
          emailError={emailError}
          passwordError={passwordError}
        />
      ) : (
        <SignupPage />
      )}
    </div>
  );
};

export default AuthPage;
