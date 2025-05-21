import React, { useEffect } from "react";
import styled from "styled-components";
import scss from "../styles/scss/LevelTest.module.scss";
import * as colors from "../component/colorConstants";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import {
  addCnt,
  initializeCnt,
  toggleFooterVisible,
  toggleHeaderVisible,
} from "../store";
import { useDispatch } from "react-redux";
import CircularProgress from "../component/CircularProgress";

const SAMPLE_VOCA = ["선택지1", "선택지2", "선택지3", "선택지4"];

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.blueColor};
`;

const SuggestedVoca = styled.p`
  color: ${colors.blueColor};
  font-weight: bold;
  font-size: 3.1rem;
  line-height: 0.7;
`;
const Question = styled.p`
  color: ${colors.dark5Color};
  font-weight: bold;
  /* font-size: 1.1rem; */
`;

const CurvedLine = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50px;
  width: 100%;
  border: none;
  border-top: 1px solid ${colors.blueColor};
  border-radius: 40px;
`;

const SelectButton = styled.button`
  border-radius: 15px;
  box-shadow: 0px 0px 4px ${colors.dark1Color};
  width: 300px;
  padding: 8px 0px 8px 0px;
  text-align: center;
  margin: 10px;
  font-size: 1.3rem;
  cursor: pointer;

  transition: 0.2s;

  &:disabled {
    background-color: ${colors.grayColor};
    color: ${colors.dark1Color};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const LevelTest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let counter = useSelector((state) => {
    return state.levelTestProgressCounter;
  });
  const footerVisible = useSelector((state) => state.footerIsVisible.visible);
  const headerVisible = useSelector((state) => state.headerIsVisible.visible);

  useEffect(() => {
    let delayTimer;

    if (counter.cnt === 5) {
      delayTimer = setTimeout(() => {
        dispatch(initializeCnt());
        dispatch(toggleFooterVisible(true));
        dispatch(toggleHeaderVisible(true));
      }, 1000);
    }

    return () => {
      clearTimeout(delayTimer);
    };
  }, [counter, dispatch]);

  useEffect(() => {
    if (counter.cnt === 0 && footerVisible && headerVisible) {
      navigate("/main", { replace: true });
    }
  }, [counter.cnt, footerVisible, headerVisible, navigate]);

  return (
    <div className={scss.wrapper}>
      <div className={scss.indicatorFlexBox}>
        <div className={scss.textBox}>
          <SuggestedVoca>단어</SuggestedVoca>
          <Line />
          <Question>유사한 뜻이 아닌 단어는?</Question>
        </div>
        <CircularProgress />
      </div>
      <CurvedLine />
      <div className={scss.selectionWrapper}>
        {SAMPLE_VOCA.map((label, i) => (
          <SelectButton
            key={i}
            disabled={counter.cnt >= 5}
            onClick={() => dispatch(addCnt())}
          >
            {label}
          </SelectButton>
        ))}
      </div>
    </div>
  );
};

export default LevelTest;
