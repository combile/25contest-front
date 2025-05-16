import { useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import '../../App.css'

import { ReactComponent as Apple } from "../../svg/apple.svg";
import { ReactComponent as Facebook } from "../../svg/facebook.svg";
import { ReactComponent as Google } from "../../svg/google.svg";
import { ReactComponent as Kakao } from "../../svg/kakao.svg";
import { ReactComponent as Naver } from "../../svg/naver.svg";

const FormWrapper = styled.form`
  width: 90%;
  max-width: 380px;
  margin-top: 45px;
`;

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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #3c3c3c;
  margin: 5px 0;

  input {
    margin-right: 10px;
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

const SocialButton = styled.div`
  margin-top: 24px;

  button {
    width: 100%;
    padding: 14px;
    margin-top: 10px;
    margin-bottom: 12px;
    border-radius: 24px;
    border: 1px solid #eee;
    background-color: #fff;
    color: #363636;
    font-weight: 500;
    font-size: 15px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25));
    cursor: pointer;

    svg {
      position: absolute;
      left: 16px;
      width: 20px;
      height: 20px;
    }
  }
`;

const LoginPage = ({ email, password, setEmail, setPassword, handleLogin }) => {
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
    <FormWrapper onSubmit={handleLogin}>
      <InputGroup>
        <label htmlFor="email">아이디</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>

      <CheckboxContainer>
        <input
          type="checkbox"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />
        로그인 상태 유지
      </CheckboxContainer>

      <LoginButton type="submit">확인</LoginButton>

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

      <SocialButton>
        <button type="button"><Naver width={20} height={20} />네이버 계정으로 로그인</button>
        <button type="button"><Kakao width={20} height={20} />카카오 계정으로 로그인</button>
        <button type="button"><Facebook width={20} height={20} />페이스북 계정으로 로그인</button>
        <button type="button"><Google width={20} height={20} />구글 계정으로 로그인</button>
        <button type="button"><Apple width={20} height={20} />애플 계정으로 로그인</button>
      </SocialButton>
    </FormWrapper>
  );
};

export default LoginPage;