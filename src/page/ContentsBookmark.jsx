// src/pages/BookmarkPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../component/axios";
import scss from "../styles/scss/ContentsBookmark.module.scss";
import NewsCard from "../component/NewsCard";
import { formatDateTime } from "../utils/dateUtils";
import extractAuthorName from "../utils/extractAuthorName";
import { URL } from "../utils/DUMMY_IMG_URL";
import * as colors from "../component/colorConstants";
import { ReactComponent as SearchIcon } from "../svg/search.svg";

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  font-family: "SFProDisplayBold";
  color: ${colors.dark3Color};
  margin: 0;
`;

const HighlightText = styled.span`
  color: ${colors.blueColor};
  font-size: 25px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  font-size: 10px;
  color: ${colors.dark2Color};
  &::placeholder {
    color: ${colors.dark1Color};
  }
  &:focus {
    outline: none;
  }
`;

const EmptyText = styled.div`
  font-size: 14px;
  padding: 0 20px;
  color: ${colors.dark2Color};
`;

const Line = styled.div`
  width: 90dvw;
  height: 1px;
  background-color: ${colors.dark0Color};
  margin: -5px auto 24px auto;
`;

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [username, setUsername] = useState("사용자");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/app-user/users");
        setUsername(res.data.username);
      } catch (err) {
        console.error(
          "유저 정보 가져오기 실패:",
          err.response?.data || err.message
        );
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await api.get("/app-user/bookmark");
        setBookmarks(res.data || []);
      } catch (err) {
        console.error(
          "북마크 불러오기 실패:",
          err.response?.data || err.message
        );
      }
    };
    fetchBookmarks();
  }, []);

  const filtered = bookmarks.filter((news) =>
    news.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={scss.Wrapper}>
      <div className={scss.HeaderRow}>
        <Title>
          <HighlightText>{username}님</HighlightText>의 북마크
        </Title>
        <div className={scss.SearchBox}>
          <SearchInput
            placeholder="찾으시는 키워드를 입력해주세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon width={14} height={14} />
        </div>
      </div>

      <Line />

      {filtered.length === 0 ? (
        <EmptyText>북마크한 뉴스가 없습니다.</EmptyText>
      ) : (
        filtered.map((news) => {
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
              source={extractAuthorName(news.author)}
              profileUrl={news.thumbnailUrl || URL}
              onClick={() => (window.location.href = `/article/${news.uuid}`)}
            />
          );
        })
      )}
    </div>
  );
};

export default BookmarkPage;
