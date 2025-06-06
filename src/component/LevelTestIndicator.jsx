import React from "react";
import styled from "styled-components";
import * as colors from "./colorConstants.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleFooterVisible, toggleHeaderVisible } from "../store.js";

const Level = styled.span`
  color: ${colors.blueColor};
  font-size: 3rem;
  font-weight: bold;
`;

const Line = styled.div`
  width: 150px;
  height: 2px;
  background: linear-gradient(
    to right,
    ${colors.blueColor},
    ${colors.dark0Color}
  );
`;

const CircleIndicator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px ${colors.blueColor};
  width: 250px;
  height: 250px;
`;

const GoToLevelTest = styled.p`
  font-size: 1.3rem;
  color: ${colors.dark4Color};
  cursor: pointer;
  &:hover {
    color: ${colors.blueColor};
  }
`;

const LevelTestIndicator = ({ vocaLevel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToLevelTest = () => {
    navigate("/level-test");
  };

  return (
    <CircleIndicator>
      <Level>{vocaLevel}</Level>
      <Line />
      <GoToLevelTest
        onClick={() => {
          goToLevelTest();
          dispatch(toggleHeaderVisible(false));
          dispatch(toggleFooterVisible(false));
        }}
      >
        시험보러가기
      </GoToLevelTest>
    </CircleIndicator>
  );
};

export default LevelTestIndicator;
