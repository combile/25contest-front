import React, { useState } from 'react';

import styled from 'styled-components';
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage';

import api from '../../component/axios';

import scss from '../../styles/scss/Auth.module.scss'
import '../../App.css'

const TabMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  position: relative;
  border-bottom: 1px solid #E0E0E0;
  width: 90%;
  max-width: 380px;

  .tab {
    font-family: 'SF_Pro_Dispay', sans-serif;
    font-size: 14px;
    text-align: center;
    padding: 15px 60px;

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

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    try {
      const response = await api.post('/auth/login', {
        loginId: email,
        password: password,
      });

      console.log("응답 전체:", response);
      console.log("응답 헤더:", response.headers);

      const accessToken = response.headers['authorization']?.split(' ')[1];
      console.log("추출한 accessToken:", accessToken);

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        alert('로그인 성공!');
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
        <>
          <LoginPage
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleLogin}
            emailError={emailError}
            passwordError={passwordError}
          />
        </>
      ) : (
        <SignupPage />
      )}
    </div>
  );
};

export default AuthPage;
