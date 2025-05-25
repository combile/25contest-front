// src/pages/TrendPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../styles/styledComponents/GlobalStyle.jsx";
import api from "../component/axios";
import HighlightSlider from "../component/HighlightSlider";
import NewsCard from "../component/NewsCard";
import extractAuthorName from "../utils/extractAuthorName";
import { getFormattedTrend, formatDateTime } from "../utils/dateUtils";
import * as colors from "../component/colorConstants";
import scss from "../styles/scss/ContentsTrend.module.scss";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/DUMMY_IMG_URL.js";

import { ReactComponent as TrendIcon } from "../svg/Trend_fill.svg";

const Line = styled.div`
  width: 90vw;
  height: 1.5px;
  background: linear-gradient(
    to right,
    ${colors.blueColor},
    ${colors.grayColor}
  );
  margin: 24px auto;
`;

const TrendIconStyled = styled(TrendIcon)`
  width: 39px;
  height: 39px;
`;

const TrendPage = () => {
  const [sortedNews, setSortedNews] = useState([]);
  const navigate = useNavigate();
  const handleClickNewsCard = (props) => {
    navigate(`/article/${props}`);
  };
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news/reading/all", {
          params: { sort: "views" },
        });
        setSortedNews(res.data || []);
      } catch (err) {
        console.error(
          "조회수 기준 뉴스 가져오기 실패:",
          err.response?.data || err.message
        );
      }
    };

    fetchNews();
  }, []);

  return (
    <div className={scss.wrapper}>
      <div className={scss.contentWrapper}>
        <div className={scss.SectionTitle}>
          현재 <span style={{ color: colors.blueColor }}>주목</span>받는 뉴스
          <TrendIconStyled />
        </div>
        <Line />
        <div className={scss.DateText}>{getFormattedTrend()} 기준</div>
        <HighlightSlider />

        {sortedNews.map((news) => {
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
  );
};

export default TrendPage;
