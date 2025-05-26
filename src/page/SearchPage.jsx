import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../component/axios";
import NewsCard from "../component/NewsCard";
import extractAuthorName from "../utils/extractAuthorName";
import { formatDateTime } from "../utils/dateUtils";
import { URL } from "../utils/DUMMY_IMG_URL";
import * as colors from "../component/colorConstants";
import scss from "../styles/scss/SearchPage.module.scss";
import { ReactComponent as SearchIcon } from "../svg/search.svg";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [result, setResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (keyword.trim().length < 2) {
      alert("검색어는 2자 이상 입력해주세요.");
      return;
    }
    
    const trimmedKeyword = keyword.trim();
    setSearchedKeyword(trimmedKeyword);
    setHasSearched(true);
    
    try {
      const res = await api.get("/news/searching", {
        params: { keyword: trimmedKeyword },
      });
      setResult(res.data || []);
    } catch (err) {
      console.error("검색 실패:", err);
      alert("검색 결과를 불러올 수 없습니다.");
    }
  };

  const handleInputChange = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    
    if (hasSearched && newKeyword.trim() !== searchedKeyword) {
      setResult([]);
      setHasSearched(false);
      setSearchedKeyword("");
    }
  };

  const handleClickNewsCard = (uuid) => {
    navigate(`/article/${uuid}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.Container}>
        <div className={scss.SearchBox}>
          <div className={scss.SearchRow}>
            <input
              className={scss.StyledInput}
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className={scss.SearchButton} onClick={handleSearch}>
              <SearchIcon width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className={scss.Line} />

      {result.length > 0 && (
        <div className={scss.contentWrapper}>
          {result.map((news) => {
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
      )}
  
      {hasSearched && result.length === 0 && (
        <div className={scss.EmptyState}>
          <div className={scss.EmptyStateText}>
            '{searchedKeyword}'에 대한<br />
            검색 결과가 없습니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;