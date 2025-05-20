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
  toggleNavVisible,
} from "../store";
import { useDispatch } from "react-redux";
import CircularProgress from "../component/CircularProgress";

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

const SelectButton = styled.li`
  border-radius: 15px;
  box-shadow: 0px 0px 4px ${colors.dark1Color};
  width: 300px;
  padding: 8px 0px 8px 0px;
  text-align: center;
  margin: 10px;
  font-size: 1.3rem;
  cursor: pointer;
`;

const LevelTest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let counter = useSelector((state) => {
    return state.levelTestProgressCounter;
  });

  useEffect(() => {
    let delay;
    if (counter.cnt === 5) {
      delay = setTimeout(() => {
        dispatch(toggleFooterVisible("true"));
        dispatch(toggleNavVisible("true"));
        dispatch(initializeCnt()); // 재진입을 고려하여 카운터 초기화

        navigate("/main", { replace: true });
      }, 2000);
    }
    return () => {
      clearTimeout(delay);
    };
  }, [counter, navigate]);

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
      <ul className={scss.selectionWrapper}>
        <SelectButton onClick={() => dispatch(addCnt())}>선택지1</SelectButton>
        <SelectButton onClick={() => dispatch(addCnt())}>선택지2</SelectButton>
        <SelectButton onClick={() => dispatch(addCnt())}>선택지3</SelectButton>
        <SelectButton onClick={() => dispatch(addCnt())}>선택지4</SelectButton>
      </ul>
    </div>
  );
};

export default LevelTest;
