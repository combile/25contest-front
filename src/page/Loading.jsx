import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import "../App.css"

import Loading from '../svg/Tutorial/Loading.png';

const Container = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  background: linear-gradient(180deg, #81A4FF 0%, #2144A0 83.65%, #1E3E92 100%);
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: white;
  position: relative;
`;

const Title = styled.div `
  position: absolute;
  width: 310px;
  height: 87px;
  left: 33px;
  top: 140px;

  font-family: 'SF_Pro_Display';
  font-weight: 700;
  font-size: 38px;
  line-height: 120%;
  letter-spacing: -0.02em;

  color: #FFFFFF;
`;
const Subtitle = styled.div `
  position: absolute;
  width: 310px;
  height: 87px;
  left: 33px;
  top: 180px;

  font-family: 'SF_Pro_Display';
  font-weight: 700;
  font-size: 26px;
  line-height: 120%;
  letter-spacing: -0.02em;

  color: #FFFFFF;
`;
const WaveBackground = styled.div`
  position: absolute;
  width: 705px;
  height: 687px;
  left: -20px;
  top: 43%;
  background-color: #ffffff;
  border-top-left-radius: 100% 70%;
  border-top-right-radius: 100% 40%;
`;

const LoadingImg = styled.div `
  position: absolute;
  width: 654.92px;
  height: 620.49px;
  background: url(${Loading});
`

const SlideIndicator = () => {
  return (
    <Container>
      <Title>바쁜 당신을 위한</Title>
      <Subtitle>빠른소식</Subtitle>
      <WaveBackground />
      <LoadingImg/>
    </Container>
  );
};

export default SlideIndicator;