import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from './axios';
import InputField from './InputField';
import ConfirmButton from './ConfirmButton';

import { ReactComponent as BackIcon } from "../svg/backicon.svg";
import { ReactComponent as CheckIcon } from '../svg/checkicon.svg';
import { ReactComponent as DeniedIcon } from '../svg/deniedicon.svg';

import scss from '../styles/scss/SignUpInfo.module.scss';
import styled from 'styled-components';


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

const SignUpInfo = ({ onSubmit,currentStep }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);

  const navigate = useNavigate();

  const validatePhoneNumber = (number) => {
    const cleaned = number.replace(/-/g, '');
    const regex = /^(01[0|1|6|7|8|9])\d{7,8}$/;
    if (!number) return null;
    if (!regex.test(cleaned)) {
      setPhoneError('유효한 휴대폰 번호를 입력해주세요');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const formatted = raw.length > 7
      ? `${raw.slice(0,3)}-${raw.slice(3,7)}-${raw.slice(7,11)}`
      : raw.length > 3
      ? `${raw.slice(0,3)}-${raw.slice(3)}`
      : raw;
    setPhoneNumber(formatted);
    setIsPhoneValid(validatePhoneNumber(raw));
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
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEmailChange = async (e) => {
    const val = e.target.value;
    setEmail(val);
    if (!validateEmail(val)) {
      setEmailError('유효한 이메일 주소를 입력해주세요');
      setIsEmailValid(false);
      return;
    }
    try {
      const res = await api.post('/app-user/initial/redundancy-check', { email: val });
      if (res.data === true) {
        setEmailError('이미 가입된 이메일입니다.');
        setIsEmailValid(false);
      } else {
        setEmailError('');
        setIsEmailValid(true);
      }
    } catch {
      setEmailError('서버 오류가 발생했습니다.');
      setIsEmailValid(false);
    }
  };

  useEffect(() => {
    setIsFormValid(name && isPhoneValid && isEmailValid);
  }, [name, isPhoneValid, isEmailValid]);

  const handleSubmit = () => {
    if (isFormValid) onSubmit({ name, phoneNumber: phoneNumber.replace(/-/g, ''), email });
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.topBar}>
        <button onClick={() => navigate('/Auth')}>
          <BackIcon width={20} height={20} style={{ marginLeft: '5px' }}/>
        </button>
        <PaginationContainer>
          <PaginationDot active={currentStep === 0} />
          <PaginationDot active={currentStep === 1} />
        </PaginationContainer>
      </div>

      <div className={scss.container}>
        <div className={scss.Title}>정보를</div>
        <div className={scss.SubTitle}>입력해주세요</div>
        <InputField 
          label="이름" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="이름을 입력하세요"
        />  
        <InputField 
          label="휴대폰번호" 
          value={phoneNumber}
          onChange={handlePhoneChange}
          onKeyDown={handlePhoneKeyDown}
          placeholder="010-0000-0000"
          isValid={isPhoneValid}
          errorMessage={phoneError}
          successMessage="사용 가능한 번호입니다"
          Icon={isPhoneValid ? CheckIcon : DeniedIcon} 
        />
        <InputField 
          label="이메일"
          value={email}
          onChange={handleEmailChange}
          isValid={isEmailValid}
          errorMessage={emailError}
          placeholder="이메일을 입력해주세요"
          successMessage="사용 가능한 이메일입니다"
          Icon={isEmailValid ? CheckIcon : DeniedIcon}
        />
      </div>
      <div className={scss.buttonWrapper}>
        <ConfirmButton onClick={handleSubmit} disabled={!isFormValid}>확인</ConfirmButton>
      </div>
    </div>
  );
};

export default SignUpInfo;