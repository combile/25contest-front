import React from 'react';
import styled from 'styled-components';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../styles/styledComponents/GlobalStyle.jsx";

import scss from '../styles/scss/Loading.module.scss'

import { ReactComponent as Logo } from "../logo.svg";
import Loading_1 from '../svg/Tutorial/Loading_1.svg';
import Loading_2 from '../svg/Tutorial/Loading_2.svg';

function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener('resize', () => setScreenSize());

const Title = styled.div`
  font-family: 'SFProDisplayBold';
  font-weight: bold;
  font-size: 45px;
  line-height: 1.2;
  margin-bottom: 5px;
`;

const Subtitle = styled.div`
  margin-top: -15px;
  font-family: 'SFProDisplayBold';
  font-weight: bold;
  font-size: 32px;
`;

const NewsText = styled.span`
  margin-left: 8px;
  font-family: 'SFProDisplayLight';
  font-size: 14px;
  opacity: 0.8;
`;

const FitText = styled.span`
  font-family: 'SFProDisplayBold';
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
  font-family: 'SFProDisplayRegular';
  font-size: 18px;
  background: linear-gradient(90deg, #336AF8 0%, #1E3E92 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SlideIndicator = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 10);
    const fadeOutTimer = setTimeout(() => {
      setVisible(false);
    }, 1800);
    const redirectTimer = setTimeout(() => {
      navigate('/tutorial');
    }, 2500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className={`${scss.container} ${visible ? scss.visible : ''}`}>
      <div className={scss.wrapper}>
        <Title>바쁜 당신을 위한</Title>
        <Subtitle>빠른 소식</Subtitle>
        <div className={scss.logoBox}>
          <Logo width={28} height={28} />
          <div>
            <NewsText>News</NewsText>
            <FitText>Fit</FitText>
          </div>
        </div>
      </div>
      <BackgroundImage />
      <PhoneImage />
      <Description>당신만을 위한 뉴스를 확인해보세요</Description>
    </div>
  );
};

export default SlideIndicator;
