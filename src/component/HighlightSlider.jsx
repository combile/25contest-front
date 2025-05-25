import React, { useEffect, useState } from "react";
import styled from "styled-components";

import extractAuthorName from "../utils/extractAuthorName";
import { formatDateTime } from "../utils/dateUtils";

import api from "../component/axios";
import scss from "../styles/scss/HighlightSlider.module.scss";
import { URL } from "../utils/DUMMY_IMG_URL.js";

import * as colors from "../component/colorConstants";
import "../styles/styledComponents/GlobalStyle.jsx";
import { useNavigate } from "react-router-dom";

const SlideCard = styled.div`
  flex: 0 0 auto;
  width: 300px;
  border-radius: 14px;
  margin-right: 12px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid ${colors.lightBlueColor};
  scroll-snap-align: end;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-top: 12px;
  color: ${colors.dark4Color};
`;

const Source = styled.div`
  font-size: 12px;
  color: ${colors.dark1Color};
  margin-top: 4px;
`;

const Description = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: ${colors.grayColor};
  border-radius: 10px;
  color: ${colors.dark3Color};
  font-size: 12px;
  line-height: 1.5;
  min-height: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 12px;
`;

const Tag = styled.div`
  background: ${colors.grayColor};
  color: ${colors.dark3Color};
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 500;
`;

const HighlightSlider = () => {
  const [topViewed, setTopViewed] = useState([]);
  const navigate = useNavigate();

  const handleClickNewsCard = (props) => {
    navigate(`/article/${props}`);
  };

  const truncateTitle = (title) => {
    return title.length > 15 ? title.slice(0, 15) + "..." : title;
  };

  const truncateContent = (content) => {
    if (!content) return "";
    return (
      content.replace(/\\n/g, " ").replace(/\s+/g, " ").trim().slice(0, 50) +
      "..."
    );
  };

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        const res = await api.get("/news/reading/all", {
          params: { sort: "views" },
        });

        let news = res.data || [];

        const allZero = news.every((item) => item.views === 0);
        if (allZero) {
          news = news.slice(0, 3);
        } else {
          news = news.sort((a, b) => b.views - a.views).slice(0, 3);
        }

        setTopViewed(news);
      } catch (err) {
        console.error(
          "조회수 기준 뉴스 로딩 실패:",
          err.response?.data || err.message
        );
      }
    };

    fetchTopNews();
  }, []);

  return (
    <div className={scss.sliderWrapper}>
      {topViewed.map((news) => {
        const { date, time } = formatDateTime(news.createdAt);
        return (
          <SlideCard
            key={news.uuid}
            onClick={() => handleClickNewsCard(news.uuid)}
          >
            <ProfileImage src={news.thumbnailUrl || URL} alt="profile" />
            <Title>{truncateTitle(news.title)}</Title>
            <Source>
              {extractAuthorName(news.author)} · {date}
              <br />
              {time}
            </Source>
            <Description>{truncateContent(news.content)}</Description>
            <TagRow>
              <Tag>{news.domains?.[0]?.domain || "시사"}</Tag>
              <Tag>{news.domains?.[1]?.domain || "기타"}</Tag>
            </TagRow>
          </SlideCard>
        );
      })}
    </div>
  );
};

export default HighlightSlider;
