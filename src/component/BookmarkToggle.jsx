import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as BookmarkSvg } from '../svg/Bookmark.svg';
import api from '../component/axios';
import scss from "../styles/scss/Bookmark.module.scss";

const StyledBookmark = styled(BookmarkSvg)`
  width: 100%;
  height: 100%;
  path {
    fill: ${({ active }) => (active ? '#336AF8' : '#E6E6E6')};
    transition: fill 0.2s;
  }
`;

const BookmarkToggle = ({ id }) => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
    setActive(stored.includes(id));
  }, [id]);

  const handleClick = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }

    setLoading(true);
    try {
      if (active) {
        await api.delete('/news/bookmark', { data: { uuid: id } });
      } else {
        await api.post('/news/bookmark', { uuid: id });
      }

      const stored = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
      const updated = active
        ? stored.filter(item => item !== id)
        : [...stored, id];
      localStorage.setItem('bookmarkedItems', JSON.stringify(updated));

      setActive(!active);
    } catch (error) {
      console.error('북마크 처리 실패:', error.response?.data || error.message);
      alert('북마크 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={scss.wrapper} onClick={loading ? null : handleClick}>
      <StyledBookmark active={active} />
    </div>
  );
};

export default BookmarkToggle;
