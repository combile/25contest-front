import React, { useState, useEffect } from 'react';
import InfoInputPage from './SignUp_Info';
import PasswordPage from './SignUp_Password';
import DonePage from './SignUp_Done';
import api from '../../../component/axios';

const SignUpContainer = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (step === 2) {
      console.log("최종 회원가입 요청 데이터:", formData);
      const registerUser = async () => {
        try {
          const response = await api.post('/app-user/initial/users', {
            username: formData.name,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            vocabularyLevel: 'LOW',
            loginId: formData.id,
            password: formData.password,
          });
          console.log('회원가입 성공:', response.data);
        } catch (error) {
          console.error('회원가입 실패:', error.response?.data || error.message);
          alert('회원가입 중 오류가 발생했습니다.');
        }
      };
      registerUser();
    }
  }, [step, formData]);

  const steps = [
    <InfoInputPage onSubmit={handleNext} key="info" />,
    <PasswordPage onSubmit={handleNext} onBack={handleBack} key="password" />,
    <DonePage key="done" />
  ];

  return steps[step];
};

export default SignUpContainer;
