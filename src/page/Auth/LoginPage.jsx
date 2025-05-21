import { useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import '../../App.css'

import scss from '../../styles/scss/Auth.module.scss'

import { ReactComponent as Apple } from "../../svg/apple.svg";
import { ReactComponent as Facebook } from "../../svg/facebook.svg";
import { ReactComponent as Google } from "../../svg/google.svg";
import { ReactComponent as Kakao } from "../../svg/kakao.svg";
import { ReactComponent as Naver } from "../../svg/naver.svg";

import { ReactComponent as DeniedIcon } from "../../svg/deniedicon.svg";


const InputGroup = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 40px;

  label {
    position: absolute;
    top: -12px;
    left: 0;
    font-size: 14px;
    color: #B7BBC5;
    padding: 0 4px;
  }

  input {
    width: 100%;
    padding: 14px 0 6px 0;
    font-size: 16px;
    border: none;
    border-bottom: 1.5px solid #B7BBC5;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 0;
    outline: none;

    &:focus {
      border-bottom: 1.5px solid #002AFF;
    }
  }
`;

const LoginButton = styled.button`
  width: 100%;
  box-shadow: 0px 0px 0px 20px rgba(255, 255, 255, 0.07), inset 0px -3px 0px rgba(0, 0, 0, 0.1), inset 0px 3px 0px rgba(255, 255, 255, 0.4);
  background-color: #336AF8;
  color: white;
  font-size: 17px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  margin: 12px 0;

  &:hover {
    background-color: #2f68e0;
  }
`;

const LinkGroup = styled.div`
  text-align: center;
  font-size: 14px;
  color: #989898;
  font-weight: bold;

  a {
    display: block;
    margin: 15px;
    color: #989898;
    text-decoration: underline;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #FF3B30;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: -30px;
  padding-left: 2px;
`;

const LoginPage = ({
  email, password, setEmail, setPassword, handleLogin,
  emailError, passwordError
}) => {
  const [remember, setRemember] = React.useState(false);
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
  
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div className={scss.loginWrapper} onSubmit={handleLogin}>
      <InputGroup>
        <label htmlFor="email">아이디</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <ErrorMessage><DeniedIcon width={14} height={14} />{emailError}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <ErrorMessage><DeniedIcon width={14} height={14} />{passwordError}</ErrorMessage>}
      </InputGroup>

      <div className={scss.loginCheckboxContainer}>
        <input
          type="checkbox"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />
        로그인 상태 유지
      </div>

      <LoginButton type="button" onClick={handleLogin}>
        확인
      </LoginButton>

      <LinkGroup>
        <a
          onClick={(e) => {
            e.preventDefault();
            alert("미구현 기능입니다.");
          }}
        >
          아이디 찾기
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            alert("미구현 기능입니다.");
          }}
        >
          비밀번호 찾기
        </a>
      </LinkGroup>

      <div className = {scss.authSocialButton}>
        <button type="button"><Naver width={20} height={20} />네이버 계정으로 로그인</button>
        <button type="button"><Kakao width={20} height={20} />카카오 계정으로 로그인</button>
        <button type="button"><Facebook width={20} height={20} />페이스북 계정으로 로그인</button>
        <button type="button"><Google width={20} height={20} />구글 계정으로 로그인</button>
        <button type="button"><Apple width={20} height={20} />애플 계정으로 로그인</button>
      </div>
    </div>
  );
};

export default LoginPage;