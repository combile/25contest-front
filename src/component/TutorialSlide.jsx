import React from 'react';
import styled from 'styled-components';

import scss from '../styles/scss/Tutorial.module.scss';
import * as colors from "../component/colorConstants";

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SlideNumber = styled.h1`
  font-family: "SFProDisplayBold";
  font-size: 36px;
  font-weight: bold;
  color: ${colors.blueColor};
  margin-bottom: 16px;
`;

const SlideTitle = styled.h2`
  font-family: "SFProDisplayRegular";
  font-size: 24px;
  font-weight: 500;
  color: ${colors.blueColor};
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-family: "SFProDisplayBold";
  font-weight: bold;
`;

const SlideImage = styled.img`
  width: ${props => props.$width || '480px'};
  height: 684px;
  margin-top: 32px;
  border-radius: 30px;
  z-index: 1;
  top: 50px;
  position: relative;
`;

const TutorialSlide = ({ number, title, subtitle, image, width }) => (
  <Slide>
    <div className={scss.contentContainer}>
      <SlideNumber>{number}</SlideNumber>
      <SlideTitle>{title}</SlideTitle>
      <SlideTitle>
        <Subtitle>{subtitle}</Subtitle>
      </SlideTitle>
    </div>
    <SlideImage src={image} alt={`tutorial_${number}`} $width={width} />
  </Slide>
);

export default TutorialSlide;
