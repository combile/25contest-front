import React from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../svg/search.svg";

import * as colors from "./colorConstants.js";

import "../styles/styledComponents/GlobalStyle.jsx";
import "../App.css";
import scss from "../styles/scss/Header.module.scss";

const LogoText = styled.h1`
  width: 131px;
  height: 32px;
  font-family: "MediaSansBold";
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.blueColor};
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  text-align: center;
  font-size: 8px;
  color: ${colors.dark3Color};

  &::placeholder {
    color: ${colors.dark1Color};
  }

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(Search)`
  width: 16px;
  height: 16px;
`;

const Line = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 90dvw;
  border-top: 1px solid ${colors.lightBlueColor};
  bottom: 0;
`;

export default function Header() {
  return (
    <div className={scss.wrapper}>
      <div className={scss.CenterSection}>
        <LogoText>NewsFit</LogoText>
        <div className={scss.SearchContainer}>
          <SearchInput placeholder="찾으시는 뉴스가 있으신가요?" />
          <SearchIcon />
        </div>
      </div>
      <Line />
    </div>
  );
}
