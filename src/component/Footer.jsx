import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import scss from "../styles/scss/Footer.module.scss";
import * as colors from "./colorConstants.js";

import { ReactComponent as TrendIcon } from "../svg/Trend.svg";
import { ReactComponent as HomeIcon } from "../svg/Main.svg";
import { ReactComponent as BookmarkIcon } from "../svg/Bookmark.svg";

const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.$active ? colors.blueColor : colors.dark1Color)};
  -webkit-tap-highlight-color: transparent;
  user-select: none;
`;

const Label = styled.span`
  font-family: "SF_Pro_Display_Bold";
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => (props.$active ? colors.blueColor : colors.dark1Color)};
`;

const IconStyle = `
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
`;

const TrendIconStyled = styled(TrendIcon)`
  ${IconStyle}
  path {
    fill: ${(props) => (props.$active ? colors.blueColor : colors.dark1Color)};
  }
`;

const HomeIconStyled = styled(HomeIcon)`
  ${IconStyle}
  path {
    fill: ${(props) => (props.$active ? colors.blueColor : colors.dark1Color)};
  }
`;

const BookmarkIconStyled = styled(BookmarkIcon)`
  ${IconStyle}
  path {
    fill: ${(props) => (props.$active ? colors.blueColor : colors.dark1Color)};
  }
`;

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <div className={scss.wrapper}>
      <FooterItem
        $active={isActive("/trend")}
        onClick={() => navigate("/trend")}
      >
        <TrendIconStyled $active={isActive("/trend")} />
        <Label $active={isActive("/trend")}>트렌드</Label>
      </FooterItem>

      <FooterItem $active={isActive("/main")} onClick={() => navigate("/main")}>
        <HomeIconStyled $active={isActive("/main")} />
        <Label $active={isActive("/main")}>메인</Label>
      </FooterItem>

      <FooterItem
        $active={isActive("/bookmark")}
        onClick={() => navigate("/bookmark")}
      >
        <BookmarkIconStyled $active={isActive("/bookmark")} />
        <Label $active={isActive("/bookmark")}>북마크</Label>
      </FooterItem>
    </div>
  );
};

export default Footer;
