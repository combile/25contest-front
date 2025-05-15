import React from "react";
import styled from "styled-components";
import { ReactComponent as Lock } from "../svg/lock.svg";
import * as colors from "./colorConstants.js";

const Line = styled.div`
  width: 150px;
  height: 2px;
  background: linear-gradient(
    to right,
    ${colors.dark1Color},
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
  box-shadow: 0px 0px 8px ${colors.dark1Color};
  width: 250px;
  height: 250px;
`;

const GoToLevelTest = styled.p`
  font-size: 1.3rem;
  color: ${colors.dark1Color};
  cursor: default;
`;

const LockedLevelTestIndicator = () => {
  return (
    <CircleIndicator>
      <Lock fill={colors.dark2Color} />
      <Line />
      <GoToLevelTest>시험보러가기</GoToLevelTest>
    </CircleIndicator>
  );
};

export default LockedLevelTestIndicator;
