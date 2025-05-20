import React from "react";
import styled from "styled-components";

import scss from "../styles/scss/TestBanner.module.scss";
import * as colors from "../component/colorConstants";
import "../styles/styledComponents/GlobalStyle.jsx";

import { ReactComponent as LeftIcon } from "../svg/test.svg";
import { useNavigate } from "react-router-dom";

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  word-break: keep-all;
`;

const SubText = styled.span`
  font-size: 11px;
  color: ${colors.dark1Color};
  font-family: "SFProDisplayRegular";
`;

const MainText = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.dark3Color};
  font-family: "SFProDisplayBold";
`;

const TestBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/level-check");
    // alert("어휘력 테스트 기능은 아직 구현되지 않았습니다.");
  };

  return (
    <div className={scss.bannerWrapper} onClick={handleClick}>
      <div className={scss.bannerLeft}>
        <div className={scss.bannerIcon}>
          <LeftIcon />
        </div>
        <TextBox>
          <SubText>단어 수준을 높이고싶다면?</SubText>
          <MainText>어휘력 테스트 보러가기</MainText>
        </TextBox>
      </div>
    </div>
  );
};

export default TestBanner;
