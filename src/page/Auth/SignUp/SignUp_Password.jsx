import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ReactComponent as BackIcon } from "../../../svg/backicon.svg";
import { ReactComponent as CheckIcon } from "../../../svg/checkicon.svg";
import { ReactComponent as DeniedIcon } from "../../../svg/deniedicon.svg";

import "../../../App.css"

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
`;

const TopBar = styled.div`
  position: relative;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 32px;
`;

const PaginationContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
`;

const PaginationDot = styled.div`
  height: 8px;
  width: ${props => props.active ? '24px' : '8px'};
  margin: 0 4px;
  border-radius: 4px;
  background-color: ${props => props.active ? '#336AF8' : '#ACACAC'};
  transition: all 0.3s ease;
`;

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
`;

const SubTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const InputWrapper = styled.div`
  margin-bottom: 30px;

  label {
    font-size: 14px;
    color: #B7BBC5;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 14px 0 6px 0;
  font-size: 16px;
  border: none;
  border-bottom: 1.5px solid
    ${props => props.$isValid === true
      ? '#34C759'
      : props.$isValid === false
      ? '#FF3B30'
      : '#B7BBC5'};
  outline: none;
  border-radius: 0;

  &:focus {
    border-bottom: 1.5px solid #336AF8;
  }
`;

const ValidMessage = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #34C759;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: -15px;
  height: 16px;
`;

const ErrorMessage = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #FF3B30;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: -15px;
  height: 16px;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 18px;
  box-shadow: 0px 0px 0px 20px rgba(255, 255, 255, 0.07), inset 0px -3px 0px rgba(0, 0, 0, 0.1), inset 0px 3px 0px rgba(255, 255, 255, 0.4);
  background-color: ${props => props.disabled ? '#B7BBC5' : '#336AF8'};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const ButtonWrapper = styled.div`
  padding: 0 24px 32px 24px;
`;

const PasswordPage = ({ onSubmit, onBack }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isIdValid, setIsIdValid] = useState(null);
  const [isPwValid, setIsPwValid] = useState(null);
  const [isConfirmValid, setIsConfirmValid] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const handleIdChange = e => {
    const value = e.target.value;
    setId(value);
  
    if (!value) {
      setIdError('');
      setIsIdValid(null);
    } else if (value.length < 3) {
      setIdError("아이디는 3자 이상이어야 합니다.");
      setIsIdValid(false);
    } else if (value === "testuser") {
      setIdError("이미 가입된 아이디입니다.");
      setIsIdValid(false);
    } else {
      setIdError('');
      setIsIdValid(true);
    }
  };

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);
  
    if (!value) {
      setPwError('');
      setIsPwValid(null);
    } else if (!/[A-Z!@#$%^&*]/.test(value)) {
      setPwError("특수문자, 대문자 중 하나 이상을 포함해주세요.");
      setIsPwValid(false);
    } else {
      setPwError('');
      setIsPwValid(true);
    }
  };

  const handleConfirmChange = e => {
    const value = e.target.value;
    setConfirm(value);
  
    if (!value || !password) {
      setConfirmError('');
      setIsConfirmValid(null);
    } else if (value !== password) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      setIsConfirmValid(false);
    } else {
      setConfirmError('');
      setIsConfirmValid(true);
    }
  };

  useEffect(() => {
    setIsValid(isIdValid === true && isPwValid === true && isConfirmValid === true);
  }, [isIdValid, isPwValid, isConfirmValid]);

  const handleSubmit = () => {
    if (isValid) {
      onSubmit({ id, password });
    }
  };

  return (
    <PageWrapper>
      <TopBar>
        <BackIcon width={20} height={20} style={{ marginLeft: '5px' }} onClick={onBack} />
        <PaginationContainer>
          <PaginationDot />
          <PaginationDot active />
        </PaginationContainer>
      </TopBar>

      <Container>
        <Title>아이디와 비밀번호를</Title>
        <SubTitle>입력해주세요</SubTitle>

        <InputWrapper>
          <label>아이디</label>
          <StyledInput
            type="text"
            value={id}
            onChange={handleIdChange}
            $isValid={isIdValid}
          />
          { idError ? (
            <ErrorMessage><DeniedIcon width={14} height={14} />{idError}</ErrorMessage>
          ) : isIdValid === true && (
            <ValidMessage>
              <CheckIcon width={14} height={14} />
              사용 가능한 아이디입니다
            </ValidMessage>
          )}
        </InputWrapper>

        <InputWrapper>
          <label>비밀번호</label>
          <StyledInput
            type="password"
            value={password}
            onChange={handlePasswordChange}
            $isValid={isPwValid}
          />
          { pwError ? (
            <ErrorMessage><DeniedIcon width={14} height={14} />{pwError}</ErrorMessage>
          ) : isPwValid === true && (
            <ValidMessage>
              <CheckIcon width={14} height={14} />
              사용 가능한 비밀번호입니다
            </ValidMessage>
          )}
        </InputWrapper>

        <InputWrapper>
          <label>비밀번호 확인</label>
          <StyledInput
            type="password"
            value={confirm}
            onChange={handleConfirmChange}
            $isValid={isConfirmValid === null ? undefined : isConfirmValid}
          />
          { confirmError ? (
            <ErrorMessage><DeniedIcon width={14} height={14} />{confirmError}</ErrorMessage>
          ) : isConfirmValid === true && (
            <ValidMessage>
              <CheckIcon width={14} height={14} />
              비밀번호가 일치합니다
            </ValidMessage>
          )}
        </InputWrapper>
      </Container>

      <ButtonWrapper>
        <ConfirmButton onClick={handleSubmit} disabled={!isValid}>
          확인
        </ConfirmButton>
      </ButtonWrapper>
    </PageWrapper>
  );
};


export default PasswordPage;
