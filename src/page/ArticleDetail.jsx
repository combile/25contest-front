import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import scss from "../styles/scss/ArticleDetail.module.scss";
import styled from "styled-components";
import {
  blueColor,
  dark0Color,
  dark1Color,
  dark2Color,
  dark3Color,
  whiteColor,
} from "../component/colorConstants";
import { ReactComponent as ViewsIcon } from "../svg/views.svg";
import { ReactComponent as BookMarkIcon } from "../svg/Bookmark.svg";

import FloatedButton from "../component/FloatedButton";
import BookmarkToggle from "../component/BookmarkToggle";
import AIModal from "../component/AIModal";
import { HighlightedArticle } from "../component/HighlightedArticle";
import api from "../component/axios";
import extractAuthorName from "../utils/extractAuthorName";

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
  line-height: 1;
  padding: 5px 10px 3px 10px;
`;

const ArticleTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  width: 90dvw;
  text-align: center;
  word-break: keep-all;
`;

const StyledBookMarkIcon = styled(BookMarkIcon)`
  path {
    fill: ${(props) => (props.active ? blueColor : dark1Color)};
  }
`;
const StyledBookMarkText = styled.span`
  color: ${(props) => (props.active ? blueColor : dark1Color)};
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

const CommentSubmitButton = styled.button`
  position: absolute;
  top: 30px;
  right: 8px;

  background-color: ${blueColor};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 3px 8px;
  font-weight: bold;
  cursor: pointer;
`;

const Article = () => {
  const { uuid } = useParams();
  const [article, setArticle] = useState();
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await api.get(`/news/reading/${uuid}`);
        setArticle(res.data);
      } catch (e) {
        console.error("Article not found", e);
      }

      try {
        const res = await api.get(`/news/check-bookmark/${uuid}`);
        setIsBookmarked(res.data === true);
      } catch (e) {
        console.error("Bookmark status fetch error", e);
      }
    };

    fetchAll();
  }, [uuid]);

  // 나중에 기사 가져올 동안 보여줄 로딩창
  if (!article) return <div>Loading...</div>;

  // 받아온 데이터 날짜 포맷팅
  const isoString = article.createdAt;
  const date = new Date(isoString);
  const formattedDate = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

  // 기사 벽돌 문장 포맷팅
  const formattedArticle = article.content
    .replace(/\\n+/g, " ")
    .replace(/다\.(?=\s|$)/g, "다.\n\n");

  const handleToggleBookmark = async () => {
    try {
      if (isBookmarked) {
        // 북마크 되어있으면 삭제
        await api.delete("/app-user/bookmark", { data: { uuid } });
      } else {
        // 북마크 안 되어있으면 등록
        await api.post("/app-user/bookmark", { uuid });
      }
      setIsBookmarked((prev) => !prev); // 상태 반전
    } catch (e) {
      console.error("북마크 토글 실패:", e);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await api.post(`/comment/comments/${uuid}`, {
        comment: comment.trim(),
      });
      alert("댓글이 등록되었습니다!");
      setComment(""); // 등록 후 초기화
    } catch (err) {
      console.error("댓글 등록 실패", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.scrollWrapper}>
        <header className={scss.headerWrapper}>
          <div className={scss.tagWrapper}>
            {article.domains.map((props, i) => (
              <Tag>{props.domain}</Tag>
            ))}
          </div>
          <ArticleTitle>{article.title}</ArticleTitle>
        </header>
        <nav className={scss.navWrapper}>
          <Line />
          <div className={scss.additionalInfoWrapper}>
            <div className={scss.leftMeta}>
              <span>{extractAuthorName(article.author)}&nbsp;기자&nbsp;</span>
              <span>{formattedDate}</span>
            </div>
            <div className={scss.rightMeta}>
              <ViewsIcon />
              <span>{article.views}</span>
            </div>
          </div>
        </nav>
        <main className={scss.contentWrapper}>
          {article.thumbnailUrl ? (
            <img src={article.thumbnailUrl} alt="썸네일" />
          ) : null}
          <HighlightedArticle
            text={formattedArticle}
            keyword_list={article.words}
          />
        </main>
        <div
          className={scss.bookMarkBtnWrapper}
          onClick={() => handleToggleBookmark()}
        >
          <div className={scss.bookMarkBtn}>
            <StyledBookMarkIcon active={isBookmarked} />
            <StyledBookMarkText active={isBookmarked}>
              북마크
            </StyledBookMarkText>
          </div>
        </div>
        <Line />

        <div className={scss.commentWrapper}>
          <form
            className={scss.commentContainer}
            onSubmit={handleSubmitComment}
          >
            <CommentAreaLabel htmlFor="comment">코멘트 쓰기</CommentAreaLabel>
            <CommentArea
              id="comment"
              placeholder="코멘트를 입력해주세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <CommentSubmitButton type="submit">작성</CommentSubmitButton>
          </form>
        </div>
      </div>

      <FloatedButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <AIModal onClose={() => setIsModalOpen(false)} uuid={uuid} />
      )}
    </div>
  );
};

export default Article;
