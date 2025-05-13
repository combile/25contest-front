import React, { useState, useEffect } from 'react';
import InfoInputPage from './SignUp_Info';
import PasswordPage from './SignUp_Password';

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

  const steps = [
    <InfoInputPage onSubmit={handleNext} key="info" />,
    <PasswordPage onSubmit={handleNext} onBack={handleBack} key="password" />
  ];
  
  return steps[step];

  
};
export default SignUpContainer;
