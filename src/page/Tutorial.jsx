import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import "../App.css"

import tutorial_1 from '../svg/Tutorial/tutorial_1.svg';
import tutorial_2 from '../svg/Tutorial/tutorial_2.svg';
import tutorial_3 from '../svg/Tutorial/tutorial_3.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: white;
  position: relative;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 16px;
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

const SlidesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-out;
  transform: translateX(-${props => props.currentPage * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled.p`
  font-weight: bold;
`;

const ContentContainer = styled.div`
  text-align: center;
  margin-top: 32px;
`;

const SlideNumber = styled.h1`
  font-family: "SF_Pro_Display";
  font-size: 36px;
  font-weight: bold;
  color: #336AF8;
  margin-bottom: 16px;
`;

const SlideTitle = styled.h2`
  font-family: "SF_Pro_Display";
  font-size: 24px;
  font-weight: 500;
  color: #336AF8;
  line-height: 1.2;
`;

const WaveBackground = styled.div`
  position: absolute;
  width: 871px;
  height: 982px;
  left: -251px;
  top: 226px;
  background-color: #92B0FF;
  border-radius: 50%;
  z-index: 1;
`;

const StyledSlideImage = styled.img`
  width: 316px;
  height: 684px;
  margin-top: 32px;
  border-radius: 30px;
`;

const SlideIndicator = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const slidesContainerRef = useRef(null);
  
  const slides = [
    {
      number: '1',
      title: '인기있는 뉴스를',
      subtitle: '한눈에!',
      image: tutorial_1,
    },
    {
      number: '2',
      title: '뉴스를 A.I.가',
      subtitle: '분석하고 요약해요',
      image: tutorial_2,
    },
    {
      number: '3',
      title: '당신만을 위한',
      subtitle: '어휘 레벨 측정',
      image: tutorial_3,
    }
  ];
  

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsSwipeActive(true);
  };

  const handleTouchMove = (e) => {
    if (!startX || !isSwipeActive) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 5) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!startX || !isSwipeActive) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < slides.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (diff < 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    }
    
    setStartX(null);
    setIsSwipeActive(false);
  };

  return (
    <Container>
      <PaginationContainer>
        {slides.map((_, index) => (
          <PaginationDot 
            key={index}
            active={index === currentPage}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </PaginationContainer>
      
      <SlidesContainer
        ref={slidesContainerRef}
        currentPage={currentPage}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <Slide key={index}>
            <ContentContainer>
              <SlideNumber>{slide.number}</SlideNumber>
              <SlideTitle>{slide.title}</SlideTitle>
              <SlideTitle>
                <Subtitle>{slide.subtitle}</Subtitle>
              </SlideTitle>
            </ContentContainer>
            <StyledSlideImage src={slide.image} alt={`tutorial_${slide.number}`} />
          </Slide>
        ))}
      </SlidesContainer>
      <WaveBackground />
    </Container>
  );
};

export default SlideIndicator;

