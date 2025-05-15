import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { blueColor, dark0Color } from "./colorConstants";
import { ReactComponent as BlueFlame } from "../svg/blueFlame.svg";

// 반지름, 선 두께 기준
const SIZE = 120;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CircularWrapper = styled.div`
  width: ${SIZE}px;
  height: ${SIZE}px;
  position: relative;
`;

const StyledSVG = styled.svg`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: ${dark0Color};
  stroke-width: ${STROKE_WIDTH};
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke-width: ${STROKE_WIDTH};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.35s;
  transform: rotate(0deg);
  transform-origin: center;
`;

const Symbol = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CircularProgress = () => {
  const cnt = useSelector((state) => state.levelTestProgressCounter.cnt);
  const max = 5;

  const progress = Math.min(cnt / max, 1);
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <CircularWrapper>
      <StyledSVG width={SIZE} height={SIZE}>
        <CircleBackground r={RADIUS} cx={SIZE / 2} cy={SIZE / 2} />
        <svg width={SIZE} height={SIZE}>
          <defs>
            <linearGradient
              id="gradientStroke"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={dark0Color} />
              <stop offset="50%" stopColor="#6c96ff" />
              <stop offset="100%" stopColor={blueColor} />
            </linearGradient>
          </defs>

          <CircleBackground r={RADIUS} cx={SIZE / 2} cy={SIZE / 2} />

          <CircleProgress
            r={RADIUS}
            cx={SIZE / 2}
            cy={SIZE / 2}
            stroke="url(#gradientStroke)" // 여기!
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </StyledSVG>
      <Symbol>
        <BlueFlame />
      </Symbol>
    </CircularWrapper>
  );
};

export default CircularProgress;
