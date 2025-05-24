import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import "../styles/styledComponents/GlobalStyle.jsx";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(51, 106, 248, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(51, 106, 248, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(51, 106, 248, 0);
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #ffffff;
  padding: 0 24px;
  text-align: center;
`;

const AnimatedText = styled.h1`
  font-size: 26px;
  font-family: "SFProDisplayBold";
  color: #363636;
  animation: ${fadeInUp} 0.6s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
`;

const Circle = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #336AF8 0%, #97B3FB 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  animation: ${scaleIn} 0.5s ease-out forwards, ${pulseAnimation} 1.5s infinite;
  animation-delay: 0s, 0.5s;
  opacity: 0;
  
  &::after {
    content: '';
    position: absolute;
    width: 35px;
    height: 18px;
    border: 4px solid white;
    border-top: 0;
    border-right: 0;
    transform: rotate(-45deg);
    top: 32px;
  }
`;

const DoneMessage = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper>
      {show && (
        <>
          <Circle />
          <AnimatedText delay="0.3s" style={{ marginTop: '20px' }}>
            가입 완료!
          </AnimatedText>
        </>
      )}
    </PageWrapper>
  );
};

export default DoneMessage;