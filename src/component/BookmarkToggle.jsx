import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as BookmarkSvg } from "../svg/Bookmark.svg";

import * as colors from "../component/colorConstants";

import scss from "../styles/scss/Bookmark.module.scss";

const StyledBookmark = styled(BookmarkSvg)`
  width: 100%;
  height: 100%;

  path {
    fill: ${({ active }) => (active ? colors.blueColor : colors.grayColor)};
    transition: fill 0.2s;
  }
`;

const BookmarkToggle = ({ id }) => {
  const storageKey = "bookmarkedItems";
  const [active, setActive] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
    setActive(stored.includes(id));
  }, [id]);

  const handleClick = () => {
    let updated;
    const stored = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (active) {
      updated = stored.filter((item) => item !== id);
    } else {
      updated = [...stored, id];
    }

    localStorage.setItem(storageKey, JSON.stringify(updated));
    setActive(!active);
  };

  return (
    <div className={scss.wrapper} onClick={handleClick}>
      <StyledBookmark active={active} />
    </div>
  );
};

export default BookmarkToggle;
