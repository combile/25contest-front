import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import scss from '../styles/scss/SignupPage.module.scss'
import scssAuth from '../styles/scss/AuthPage.module.scss'

import { ReactComponent as Apple } from "../svg/apple.svg";
import { ReactComponent as Facebook } from "../svg/facebook.svg";
import { ReactComponent as Google } from "../svg/google.svg";
import { ReactComponent as Kakao } from "../svg/kakao.svg";
import { ReactComponent as Naver } from "../svg/naver.svg";

const Title = styled.h2`
  font-size: 24px;
  color: #363636;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #989898;
  margin-bottom: 20px;
`;

const SignUpButton = styled.button`
  width: 100%;
  background-color: #336AF8;
  box-shadow: 0px 0px 0px 20px rgba(255, 255, 255, 0.07), inset 0px -3px 0px rgba(0, 0, 0, 0.1), inset 0px 3px 0px rgba(255, 255, 255, 0.4);
  color: white;
  font-size: 17px;
  padding: 14px;
  border: none;
  border-radius: 24px;
  font-weight: bold;
  cursor: pointer;
  margin: 12px 0;

  &:hover {
    background-color: #2f68e0;
  }
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("SignUp");
  }
  
  return (
    <div className = {scss.signUpWrapper}>
      <Title>회원가입</Title>
      <Subtitle>뉴스를 쉽고, 간결하고, 중립적으로 !</Subtitle>
      <div className = {scssAuth.authSocialButton}>
        <button type="button"><Naver width={20} height={20} />네이버 계정으로 회원가입</button>
        <button type="button"><Kakao width={20} height={20} />카카오 계정으로 회원가입</button>
        <button type="button"><Facebook width={20} height={20} />페이스북 계정으로 회원가입</button>
        <button type="button"><Google width={20} height={20} />구글 계정으로 회원가입</button>
        <button type="button"><Apple width={20} height={20} />애플 계정으로 회원가입</button>
      </div>
      <SignUpButton onClick={handleSignUp}>가입하기</SignUpButton>
    </div>
  );
};

export default SignupPage;