import React from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../svg/search.svg";

import * as colors from "./colorConstants.js";

import '../App.css'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center; 
  align-items: center;
  background-color: ${colors.whiteColor};
  height: 80px;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 47px;
`;

const LogoText = styled.h1`
  width: 131px;
  height: 32px;
  font-family: 'Media_Sans_Bold';
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.02em;

  color: ${colors.blueColor};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.grayColor};
  padding: 6px 12px;
  border-radius: 999px;
  width: 141px;
  height: 32px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  text-align: center;
  font-size: 8px;
  color: #111827;

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
  width: 317px;
  border-top: 1px solid ${colors.lightBlueColor};
  bottom: 0;
`;

export default function Header() {
  return (
    <HeaderContainer>
    <CenterSection>
      <LogoText>NewsFit</LogoText>
      <SearchContainer>
        <SearchInput placeholder="찾으시는 뉴스가 있으신가요?" />
        <SearchIcon />
      </SearchContainer>
    </CenterSection>

    <Line />
  </HeaderContainer>
  );
}
