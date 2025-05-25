import React, { useEffect, useState } from "react";
import styled from "styled-components";

import api from "../component/axios";

import scss from "../styles/scss/ContentsMain.module.scss";
import * as colors from "../component/colorConstants";
import "../styles/styledComponents/GlobalStyle.jsx";
import { URL } from "../utils/DUMMY_IMG_URL.js";

import TestBanner from "../component/TestBanner";
import HighlightSlider from "../component/HighlightSlider";
import NewsCard from "../component/NewsCard";
import extractAuthorName from "../utils/extractAuthorName";

import { getFormattedDate, formatDateTime } from "../utils/dateUtils";
import { useNavigate } from "react-router-dom";

const TextBanner = styled.div`
  font-family: "SFProDisplayBold";
  font-weight: 700;
  font-size: 20px;
  padding: 16px 20px;
  letter-spacing: -0.02em;
  margin-top: -20px;
  color: ${colors.dark4Color};
  padding-left: 28px;
  word-break: keep-all;
`;
const DateText = styled.div`
  font-size: 14px;
  color: ${colors.dark3Color};
  font-weight: 500;
  padding: 0 20px;
  margin-top: 30px;
  padding-left: 28px;
  word-break: keep-all;
`;

const Line = styled.div`
  width: 90dvw;
  height: 1px;
  background-color: ${colors.dark0Color};
  margin: -5px auto 24px auto;
`;

const ContentsMain = () => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  const handleClickNewsCard = (props) => {
    navigate(`/article/${props}`);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news/reading/all", {
          params: {
            sort: "latest",
          },
        });
        // console.log("뉴스 불러오기 성공", res.data);
        setNewsList(res.data);
      } catch (err) {
        console.error("뉴스 가져오기 실패", err.response?.data || err.message);
      }
    };

    fetchNews();
  }, []);

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

          {newsList.map((news) => {
            const { date, time } = formatDateTime(news.createdAt);
            return (
              <NewsCard
                key={news.uuid}
                id={news.uuid}
                title={news.title}
                tag1={news.domains?.[0]?.domain || "기타"}
                tag2={news.domains?.[1]?.domain || "기타"}
                view={news.views}
                date={date}
                time={time}
                source={extractAuthorName(news.author) || "__"}
                profileUrl={news.thumbnailUrl || URL}
                onClick={() => handleClickNewsCard(news.uuid)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentsMain;
