import React from "react";
import styled from "styled-components";

import scss from "../styles/scss/ContentsMain.module.scss";
import * as colors from "../component/colorConstants";
import "../styles/styledComponents/GlobalStyle.jsx";
import { URL } from "../utils/DUMMY_IMG_URL.js";

import TestBanner from "../component/TestBanner";
import HighlightSlider from "../component/HighlightSlider";
import NewsCard from "../component/NewsCard";

import { getFormattedDate } from "../utils/dateUtils";

const TextBanner = styled.div`
  font-family: "SFProDisplayBold";
  font-weight: 700;
  font-size: 20px;
  padding: 16px 20px;
  letter-spacing: -0.02em;
  margin-top: -20px;
  color: #363636;
  padding-left: 28px;
`;
const DateText = styled.div`
  font-size: 14px;
  color: #999;
  font-weight: 500;
  padding: 0 20px;
  margin-top: 30px;
  padding-left: 28px;
  overflow: hidden;
`;

const Line = styled.div`
  width: 90dvw;
  height: 1px;
  background-color: ${colors.dark0Color};
  margin: -5px auto 24px auto;
`;

const ContentsMain = () => {
  return (
    <div className={scss.wrapper}>
      <div className={scss.scrollWrapper}>
        <div className={scss.contentWrapper}>
          <TestBanner />
          <TextBanner>
            오늘 가장 <span style={{ color: colors.blueColor }}>주목</span>받는
            뉴스를 모아봤어요
          </TextBanner>
          <Line />
          <HighlightSlider />
          <div>
            <DateText>{getFormattedDate()}</DateText>
            <TextBanner>
              이 뉴스는 보셨나요?{" "}
              <span style={{ color: colors.blueColor }}>새로운</span> 뉴스예요!
            </TextBanner>
          </div>

          <Line />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
            <NewsCard
              id="news-777"
              title="속보, 우은식 지금 과제 하나도 안함 ㅋㅋ"
              tag1="시사"
              tag2="비틱"
              view={16834}
              time="1시간 전"
              source="한밭뉴스"
              profileUrl={URL}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentsMain;
