import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import scss from "../styles/scss/ArticleDetail.module.scss";
import styled from "styled-components";
import {
  dark0Color,
  dark1Color,
  dark2Color,
  dark3Color,
  whiteColor,
} from "../component/colorConstants";
import { ReactComponent as ViewsIcon } from "../svg/views.svg";
import { ReactComponent as BookMarkIcon } from "../svg/Bookmark.svg";

import { DUMMY_DATA } from "../utils/DUMMY_DATA";

const Line = styled.div`
  background-color: ${dark0Color};
  height: 1px;
  width: 90dvw;
`;

const Tag = styled.div`
  border-radius: 20px;
  background-color: ${dark2Color};
  color: ${whiteColor};
  font-size: 10px;
  font-weight: bold;
  line-height: 0.7;
  padding: 6px 10px 3px 10px;
`;

const ArticleTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  width: 90dvw;
  text-align: center;
  word-break: keep-all;
`;

const CommentAreaLabel = styled.label`
  color: ${dark3Color};
  font-weight: 600;
  position: absolute;
  top: -40px;
  left: 10px;
`;

const CommentArea = styled.textarea`
  resize: none;
  box-shadow: 0px 0px 5px ${dark1Color};
  border-radius: 20px;
  width: 100%;
  padding: 10px 15px 10px 15px;
`;

const Article = () => {
  const { uuid } = useParams();
  const [article, setArticle] = useState(null);

  const isoString = DUMMY_DATA.createdAt;
  const date = new Date(isoString);

  // 받아온 데이터 날짜 포맷팅
  const formatted = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

  // 기사 벽돌 문장 포맷팅
  const formattedArticle = DUMMY_DATA.content.replace(
    /다\.(?=\s|$)/g,
    "다.\n\n"
  );

  useEffect(() => {
    // uuid 기반으로 특정 article 데이터 요청하는 코드 필요
    // const fetchArticle = async () => {
    //   try {
    //     const res = await axios.get(`/api/articles/${uuid}`);
    //     setArticle(res.data);
    //   } catch (e) {
    //     console.error("Article not found", e);
    //   }
    // };
    // fetchArticle();
  }, [uuid]);

  // 나중에 기사 가져올 동안 보여줄 로딩창
  if (!DUMMY_DATA) return <div>Loading...</div>;

  return (
    <div className={scss.wrapper}>
      <div className={scss.scrollWrapper}>
        <header className={scss.headerWrapper}>
          <div className={scss.tagWrapper}>
            {DUMMY_DATA.domains.map((props, i) => (
              <Tag>{props.domain}</Tag>
            ))}
          </div>
          <ArticleTitle>{DUMMY_DATA.title}</ArticleTitle>
        </header>
        <nav className={scss.navWrapper}>
          <Line />
          <div className={scss.additionalInfoWrapper}>
            <div className={scss.leftMeta}>
              <span>{DUMMY_DATA.author}&nbsp;기자&nbsp;</span>
              <span>{formatted}</span>
            </div>
            <div className={scss.rightMeta}>
              <ViewsIcon />
              <span>{DUMMY_DATA.views}</span>
            </div>
          </div>
        </nav>
        <main className={scss.contentWrapper}>
          <img src={DUMMY_DATA.thumbnailUrl} alt="썸네일" />
          <div>{formattedArticle}</div>
        </main>
        <div className={scss.bookMarkBtnWrapper}>
          <div className={scss.bookMarkBtn}>
            <BookMarkIcon />
            <span>북마크</span>
          </div>
        </div>
        <Line />

        <div className={scss.commentWrapper}>
          <div className={scss.commentContainer}>
            <CommentAreaLabel htmlFor="comment">코멘트 쓰기</CommentAreaLabel>
            <CommentArea id="comment" placeholder="코멘트를 입력해주세요" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
