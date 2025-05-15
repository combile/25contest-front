import React from 'react';
import styled from 'styled-components';
import "../App.css";

import { ReactComponent as Logo } from "../logo.svg";
import Loading_1 from '../svg/Tutorial/Loading_1.svg';
import Loading_2 from '../svg/Tutorial/Loading_2.svg';


const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(180deg, #81A4FF 0%, #2144A0 83.65%, #1E3E92 100%);
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  display: flex;
  flex-direction: column;
  color: white;
`;

const Title = styled.div`
  font-family: 'SF_Pro_Display_Bold';
  font-weight: bold;
  font-size: 45px;
  line-height: 1.2;
  margin-bottom: 5px;
`;

const Subtitle = styled.div`
  margin-top: -20px;
  font-family: 'SF_Pro_Display_Bold';
  font-weight: bold;
  font-size: 45px;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const NewsText = styled.span`
  margin-left: 8px;
  font-family: 'SF_Pro_Display_Light';
  font-size: 14px;
  opacity: 0.8;
`;

const FitText = styled.span`
  font-family: 'SF_Pro_Display_Bold';
  font-size: 14px;
  opacity: 0.8;
`;

const BackgroundImage = styled.div `
  position: absolute;
  width: 705px;
  height: 687px;
  left: -80px;
  top: 357px;
  background: url(${Loading_1});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

`

const PhoneImage = styled.div`
  position: absolute;
  width: 800px;
  height: 800px;
  right: -210px;
  bottom: -100px;
  margin: 80px auto 0 auto;
  background: url(${Loading_2});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Description = styled.div`
  position: absolute;
  bottom: 32px;
  width: 100%;
  text-align: center;
  font-family: 'SF_Pro_Display';
  font-size: 18px;
  background: linear-gradient(90deg, #336AF8 0%, #1E3E92 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SlideIndicator = () => {
  return (
    <Container>
      <ContentWrapper>
        <Title>바쁜 당신을 위한</Title>
        <Subtitle>빠른 소식</Subtitle>
        <LogoBox>
          <Logo width={28} height={28} />
          <div>
            <NewsText>News</NewsText>
            <FitText>Fit</FitText>
          </div>
      </LogoBox>
      </ContentWrapper>
      <BackgroundImage/>
      <PhoneImage />
      <Description>당신만을 위한 뉴스를 확인해보세요</Description>
    </Container>
  );
};

export default SlideIndicator;
