import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Apple } from "../../svg/apple.svg";
import { ReactComponent as Facebook } from "../../svg/facebook.svg";
import { ReactComponent as Google } from "../../svg/google.svg";
import { ReactComponent as Kakao } from "../../svg/kakao.svg";
import { ReactComponent as Naver } from "../../svg/naver.svg";

const FormContainer = styled.div`
  width: 90%;
  max-width: 380px;
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const SocialButton = styled.div`
  margin-top: 24px;
  width: 100%;
  
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

const SignupPage = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("SignUp");
  }
  
  return (
    <FormContainer>
      <Title>회원가입</Title>
      <Subtitle>뉴스를 쉽고, 간결하고, 중립적으로 !</Subtitle>
      <SocialButton>
        <button type="button"><Naver width={20} height={20} />네이버 계정으로 회원가입</button>
        <button type="button"><Kakao width={20} height={20} />카카오 계정으로 회원가입</button>
        <button type="button"><Facebook width={20} height={20} />페이스북 계정으로 회원가입</button>
        <button type="button"><Google width={20} height={20} />구글 계정으로 회원가입</button>
        <button type="button"><Apple width={20} height={20} />애플 계정으로 회원가입</button>
      </SocialButton>
      <SignUpButton onClick={handleSignUp}>가입하기</SignUpButton>
    </FormContainer>
  );
};

export default SignupPage;