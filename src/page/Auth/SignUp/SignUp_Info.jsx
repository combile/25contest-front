import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

import { ReactComponent as BackIcon } from "../../../svg/backicon.svg";
import { ReactComponent as CheckIcon } from "../../../svg/checkicon.svg";
import { ReactComponent as DeniedIcon } from "../../../svg/deniedicon.svg";



import "../../../App.css"

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
  cursor: pointer;
`;

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

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-family: "SF_Pro_Display_Bold";
`;

const SubTitle = styled.h1`
  font-size: 22px;
  font-family: "SF_Pro_Display_Bold";
  margin-bottom: 50px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 50px;

  label {
    position: absolute;
    top: -14px;
    left: -3px;
    font-size: 14px;
    color: #B7BBC5;
    padding: 0 4px;
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


const ConfirmButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 18px;
  background-color: ${props => props.disabled ? '#B7BBC5' : '#336AF8'};
  box-shadow: 0px 0px 0px 20px rgba(255, 255, 255, 0.07), inset 0px -3px 0px rgba(0, 0, 0, 0.1), inset 0px 3px 0px rgba(255, 255, 255, 0.4);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  transition: all 0.3s ease;
`;

const ButtonWrapper = styled.div`
  padding: 0 24px 32px 24px;
`;

const InfoInputPage = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);

  const validatePhoneNumber = (number) => {
    const cleaned = number.replace(/-/g, '');
    const regex = /^(01[0|1|6|7|8|9])(\d{4})(\d{4})$/;
  
    if (!number) {
      setPhoneError('');
      return null;
    } else if (!regex.test(cleaned)) {
      setPhoneError('유효한 휴대폰 번호를 입력해주세요');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  const handlePhoneKeyDown = (e) => {
    const isBackspace = e.key === 'Backspace';
    const position = e.target.selectionStart;
  
    if (isBackspace && phoneNumber[position - 1] === '-') {
      e.preventDefault();
      const newValue =
        phoneNumber.slice(0, position - 2) + phoneNumber.slice(position);
      setPhoneNumber(newValue);
    }
  };
  
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let formatted = value;
  
    if (value.length > 3 && value.length <= 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
  
    setPhoneNumber(formatted);
    const isValid = validatePhoneNumber(value);
    setIsPhoneValid(isValid);
  };
  
  useEffect(() => {
    const isNameValid = name.trim().length > 0;
    setIsFormValid(isNameValid && isPhoneValid === true && isEmailValid === true);
  }, [name, isPhoneValid, isEmailValid]);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!value) {
      setEmailError('');
      return null;
    } else if (!regex.test(value)) {
      setEmailError('유효한 이메일 주소를 입력해주세요');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    setIsEmailValid(isValid);
  };
  
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/Auth");
  }

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit({ name, phoneNumber, email});
    }
  };
  
  return (
    <PageWrapper>
      <TopBar>
        <BackIcon width={20} height={20} style={{ marginLeft: '5px' }} onClick = {handleBack}/>
        <PaginationContainer>
          <PaginationDot active />
          <PaginationDot />
      </PaginationContainer>
      </TopBar>
  
      <Container>
        <Title>정보를</Title>
        <SubTitle>입력해주세요</SubTitle>
  
        <InputWrapper>
          <label htmlFor="name">이름</label>
          <StyledInput
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </InputWrapper>
  
        <InputWrapper>
          <label htmlFor="phone">휴대폰번호</label>
          <StyledInput
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onKeyDown={handlePhoneKeyDown}
            placeholder="010-0000-0000"
            $isValid={isPhoneValid === null ? undefined : isPhoneValid}
          />
          {phoneError ? (
            <ErrorMessage><DeniedIcon width={14} height={14} />{phoneError}</ErrorMessage>
          ) : (
            isPhoneValid && <ValidMessage><CheckIcon width={14} height={14} />사용 가능한 번호입니다</ValidMessage>
          )}
        </InputWrapper>
        
        <InputWrapper>
          <label htmlFor="email">이메일</label>
          <StyledInput
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해주세요"
            $isValid={isEmailValid === null ? undefined : isEmailValid}
          />
          {emailError ? (
            <ErrorMessage><DeniedIcon width={14} height={14} />{emailError}</ErrorMessage>
          ) : (
            isEmailValid === true && <ValidMessage><CheckIcon width={14} height={14} />사용 가능한 이메일입니다</ValidMessage>
          )}
        </InputWrapper>
      </Container>
  
      <ButtonWrapper>
        <ConfirmButton 
          onClick={handleSubmit} 
          disabled={!isFormValid}
        >
          확인
        </ConfirmButton>
      </ButtonWrapper>
    </PageWrapper>
  );  
};

export default InfoInputPage;