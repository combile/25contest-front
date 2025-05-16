import React, { useState } from 'react';
import styled from 'styled-components';
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage';

import '../../App.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  position: relative;
  border-bottom: 1px solid #E0E0E0;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0;
  width: 90%;
  max-width: 380px;

  .tab {
    font-family: 'SF_Pro_Dispay', sans-serif;
    font-size: 14px;
    text-align: center;
    padding: 15px 60px;
    cursor: pointer;
    font-family: "SF_Pro_Display";
    font-weight: bold;
    color: #363636;
    position: relative;

    &.active {
      color: #002AFF;
    }

    &.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #002AFF;
    }
  }
`;

const AuthPage = () => {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인 시도', email, password);
    alert(`로그인을 시도하였습니다 : ${email}`);
  };

  return (
    <Container>
      <TabMenu>
        <div
          className={`tab ${tab === 'signup' ? 'active' : ''}`}
          onClick={() => setTab('signup')}
        >
          회원가입
        </div>
        <div
          className={`tab ${tab === 'login' ? 'active' : ''}`}
          onClick={() => setTab('login')}
        >
          로그인
        </div>
      </TabMenu>

      {tab === 'login' ? (
        <LoginPage
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <SignupPage />
      )}
    </Container>
  );
};

export default AuthPage;