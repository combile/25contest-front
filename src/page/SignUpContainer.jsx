import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import InfoInputPage from '../component/SignUp_Info';
import PasswordPage from '../component/SignUp_Password';
import DonePage from '../component/SignUp_Done';
import api from '../component/axios';

const SignUpContainer = () => {
  const navigate = useNavigate();

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
          setTimeout(() => navigate("/main"), 2000);
        } catch (error) {
          console.error('회원가입 실패:', error.response?.data || error.message);
          alert('회원가입 중 오류가 발생했습니다.');
        }
      };
      registerUser();
    }
  }, [step, formData, navigate]);

  const steps = [
    <InfoInputPage onSubmit={handleNext} currentStep={step} key="info" />,
    <PasswordPage onSubmit={handleNext} onBack={handleBack} currentStep={step} key="password" />,
    <DonePage key="done" />
  ];

  return steps[step];
};

export default SignUpContainer;
