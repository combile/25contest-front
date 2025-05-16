import React, { useState, useRef, useEffect } from 'react'; // useEffect 순서 맞추기
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import "../App.css"

import tutorial_1 from '../svg/Tutorial/tutorial_1.svg';
import tutorial_2 from '../svg/Tutorial/tutorial_2.svg';
import tutorial_3 from '../svg/Tutorial/tutorial_3.svg';


function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener('resize', () => setScreenSize());

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  overflow: hidden;
  background-color: white;
  position: relative;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transition: opacity 0.8s ease-in-out;
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
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.currentPage * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContentContainer = styled.div`
  text-align: center;
  margin-top: 32px;
`;

const SlideNumber = styled.h1`
  font-family: "SF_Pro_Display_Bold";
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

const Subtitle = styled.p`
  font-family: "SF_Pro_Display_Bold";
  font-weight: bold;
`;

const Background = styled.div`
  position: absolute;
  width: 871px;
  height: 982px;
  top: 720px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #92B0FF;
  border-radius: 50%;
  z-index: 0;
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

const StartPopup = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%, 20px);
  background-color: #336AF8;
  color: white;
  padding: 16px 24px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 500;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: opacity 0.4s ease, transform 0.4s ease;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: ${props => props.$visible ? 'translate(-50%, 0)' : 'translate(-50%, 20px)'};
`;

const SlideIndicator = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const slidesContainerRef = useRef(null);

  const navigate = useNavigate();
  const handleAuth = () => {
    navigate("/Auth");
  }

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

  useEffect(() => {
    if (currentPage === 2) {
      setPopupVisible(true);
    } else {
      setPopupVisible(false);
    }
  }, [currentPage]);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 10); // 자연스럽게 나타나도록 지연
    return () => clearTimeout(showTimer);
  }, []);

  return (
    <Container $visible={visible}>
      <Background />
  
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
            <SlideImage
              src={slide.image}
              alt={`tutorial_${slide.number}`}
              $width={index === 0 || index === 2 ? '340px' : '480px'}
            />
          </Slide>
        ))}
      </SlidesContainer>
  
      {currentPage === 2 && (
        <StartPopup $visible={popupVisible} onClick={() => handleAuth()}>
          시작하러 가기
        </StartPopup>
      )}
    </Container>
  );  
};

export default SlideIndicator;

