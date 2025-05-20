import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import BookmarkToggle from "./BookmarkToggle";

import scss from "../styles/scss/HighlightSlider.module.scss";
import { URL } from "../utils/DUMMY_IMG_URL.js";

import * as colors from "../component/colorConstants";
import "../styles/styledComponents/GlobalStyle.jsx";

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
  color: ${colors.dark4Color};
  font-size: 13px;
  line-height: 1.5;
  min-height: 60px;
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

const Indicator = styled.div`
  width: 24px;
  height: 4px;
  border-radius: 2px;
  background-color: ${(props) =>
    props.active ? colors.blueColor : colors.dark0Color};
  transition: background-color 0.3s;
`;

const HighlightSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const highlights = [
    {
      id: "news-1",
      title: "현재, 새벽 3시 반 “생활패턴이 꼬였어요”",
      source: "한반뉴스 · 1시간 전",
      image: URL,
      description: "dk..",
    },
    {
      id: "news-2",
      title: "요즘 늦잠에 빠졌어요",
      source: "한반뉴스 · 2시간 전",
      image: URL,
      description: "밤낮이 바뀌었는데 다시 돌리는 게 힘드네요...",
    },
    {
      id: "news-3",
      title: "오늘도 날밤... 커피가 친구네요",
      source: "한반뉴스 · 3시간 전",
      image: URL,
      description: "내일 아침 일정도 있는데 큰일입니다ㅠㅠ",
    },
    {
      id: "news-4",
      title: "오늘도 날밤... 커피가 친구네요",
      source: "한반뉴스 · 3시간 전",
      image: URL,
      description: "내일 아침 일정도 있는데 큰일입니다ㅠㅠ",
    },
    {
      id: "news-5",
      title: "오늘도 날밤... 커피가 친구네요",
      source: "한반뉴스 · 3시간 전",
      image: URL,
      description: "내일 아침 일정도 있는데 큰일입니다ㅠㅠ",
    },
    {
      id: "news-6",
      title: "오늘도 날밤... 커피가 친구네요",
      source: "한반뉴스 · 3시간 전",
      image: URL,
      description: "내일 아침 일정도 있는데 큰일입니다ㅠㅠ",
    },
    {
      id: "news-7",
      title: "오늘도 날밤... 커피가 친구네요",
      source: "한반뉴스 · 3시간 전",
      image: URL,
      description: "내일 아침 일정도 있는데 큰일입니다ㅠㅠ",
    },
    {
      id: "news-8",
      title: "오늘도 날밤... 커피가 친구네요",
      source: "한반뉴스 · 3시간 전",
      image: URL,
      description: "내일 아침 일정도 있는데 큰일입니다ㅠㅠ",
    },
    {
      id: "news-9",
      title: "오늘도 날밤... 커피가 친구네요",
      source: "한반뉴스 · 3시간 전",
      image: URL,
      description: "내일 아침 일정도 있는데 큰일입니다ㅠㅠ",
    },
  ];

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;

      const card = sliderRef.current.querySelector("div"); // 첫 SlideCard
      if (!card) return;

      const cardStyle = getComputedStyle(card);
      const cardWidth =
        card.offsetWidth +
        parseInt(cardStyle.marginRight) +
        parseInt(cardStyle.marginLeft); // 혹시 양쪽 margin이 있을 경우 대비

      const newIndex = Math.floor(scrollPosition / cardWidth + 0.5);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < highlights.length
      ) {
        setActiveIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const cardWidth = 300 + 12;
      const initialIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(initialIndex);
    }
  }, []);

  return (
    <>
      <div
        className={scss.sliderWrapper}
        ref={sliderRef}
        onScroll={handleScroll}
      >
        {highlights.map((item, idx) => (
          <SlideCard key={item.id}>
            <ProfileImage src={item.image} alt="profile" />
            <Title>{item.title}</Title>
            <Source>{item.source}</Source>
            <Description>{item.description}</Description>
            <TagRow>
              <Tag>시사</Tag>
              <Tag>비틱</Tag>
            </TagRow>
            <BookmarkToggle id={item.id} />
          </SlideCard>
        ))}
      </div>
    </>
  );
};

export default HighlightSlider;
