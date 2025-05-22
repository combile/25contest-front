// component/Modal.jsx
import styled from "styled-components";
import scss from "../styles/scss/AIModal.module.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  blueColor,
  dark1Color,
  redColor,
  whiteColor,
} from "../component/colorConstants";

const SlideWrapper = styled.div`
  display: flex;
  height: 100%;
  transform: translateX(${(props) => `-${props.index * 100}%`});
  transition: transform 0.3s ease-in-out;
`;

const SlideContent = styled.div`
  overflow-y: auto;
  border-radius: 20px;
  box-shadow: 0px 0px 5px ${dark1Color};
  background: #fff;
  height: 400px;
  width: 100%;
  padding: 20px 20px;
`;

const Dash = styled.div`
  width: ${(props) => (props.active ? `20px` : `5px`)};
  height: 5px;
  border-radius: 10px;
  margin: 0 4px;
  background: ${(props) => (props.active ? `${blueColor}` : `${dark1Color}`)};
  transition: background 0.2s ease-in-out;
  transition: width 0.2s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);

  padding: 8px 40px;
  background-color: ${blueColor};

  border: none;
  border-radius: 20px;

  cursor: pointer;

  color: ${whiteColor};
  font-weight: bold;
  font-size: 14px;
`;

const SummaryTitleText = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const AICommentTitleText = styled.p`
  font-size: 30px;
  font-weight: bold;
  /* line-height: 1; */
`;
const SmallGrayText = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: ${dark1Color};
`;

const NegativeColor = styled.span`
  color: ${redColor};
`;
const PositiveColor = styled.span`
  color: ${blueColor};
`;

const Line = styled.div`
  background-color: ${dark1Color};
  height: 0.5px;
  width: 100%;
  margin: 5px 0px;
`;

const SlidingModal = ({ uuid, onClose }) => {
  const [index, setIndex] = useState(0);
  const [summary, setSummary] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const startX = useRef(0);
  const deltaX = useRef(0);

  // 나중에 API 연결시 사용
  // useEffect(() => {
  //   axios
  //     .get(`/api/summary/summarys/${uuid}`)
  //     .then((res) => setSummary(res.data))
  //     .catch((err) => console.error("Summary fetch error", err));

  //   axios
  //     .get(`/api/pnevaluation/pnevaluations/${uuid}`)
  //     .then((res) => setEvaluation(res.data))
  //     .catch((err) => console.error("PN Evaluation fetch error", err));
  // }, [uuid]);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    deltaX.current = e.touches[0].clientX - startX.current;
  };

  const handleTouchEnd = () => {
    if (deltaX.current > 50 && index > 0) setIndex(index - 1);
    if (deltaX.current < -50 && index < 2) setIndex(index + 1);
    deltaX.current = 0;
  };

  return (
    <>
      <div className={scss.blurBg} />
      <div className={scss.overlay} onClick={onClose}>
        <div
          className={scss.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={scss.paginationWrapper}>
            {[0, 1, 2].map((i) => (
              <Dash key={i} active={index === i} />
            ))}
          </div>

          <SlideWrapper
            index={index}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={scss.slide}>
              <div>
                <SummaryTitleText>뉴스를 요약해 드렸어요</SummaryTitleText>
                <Line />
              </div>
              <SlideContent>
                {summary ? summary.summaryContent : "불러오는 중..."}
              </SlideContent>
            </div>
            <div className={scss.slide}>
              <div className={scss.aiCommentTitleWrapper}>
                <AICommentTitleText>
                  <PositiveColor>긍정</PositiveColor> 분석!
                </AICommentTitleText>
                <Line />
                <SmallGrayText>
                  AI는 해당 기사를 이렇게 생각했어요
                </SmallGrayText>
              </div>

              <SlideContent>
                {evaluation ? evaluation.positiveComment : "불러오는 중..."}
              </SlideContent>
            </div>
            <div className={scss.slide}>
              <div className={scss.aiCommentTitleWrapper}>
                <AICommentTitleText>
                  <NegativeColor>부정</NegativeColor> 분석!
                </AICommentTitleText>
                <Line />
                <SmallGrayText>
                  AI는 해당 기사를 이렇게 생각했어요
                </SmallGrayText>
              </div>

              <SlideContent>
                {evaluation ? evaluation.negativeComment : "불러오는 중..."}
              </SlideContent>
            </div>
          </SlideWrapper>

          <CloseButton onClick={onClose}>닫기</CloseButton>
        </div>
      </div>
    </>
  );
};

export default SlidingModal;
