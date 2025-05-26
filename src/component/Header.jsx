import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Search } from "../svg/search.svg";
import * as colors from "./colorConstants.js";
import "../styles/styledComponents/GlobalStyle.jsx";
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
    font-family: "SFProDisplayRegular";
  }

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(Search)`
  width: 16px;
  height: 16px;
  cursor: pointer;
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
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleClickSearch = () => {
    navigate("/search");
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.CenterSection}>
        <LogoText>NewsFit</LogoText>
        <div className={scss.SearchContainer}>
          <SearchInput
            placeholder="찾으시는 뉴스가 있으신가요?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={handleClickSearch}
            readOnly
          />
          <SearchIcon onClick={handleClickSearch} />
        </div>
      </div>
      <Line />
    </div>
  );
}
