import React, { useState } from 'react';
import styled from 'styled-components';

import '../App.css'
import * as colors from "./colorConstants.js";

import { ReactComponent as TrendIcon } from '../svg/Trend.svg';
import { ReactComponent as HomeIcon } from '../svg/Main.svg';
import { ReactComponent as BookmarkIcon } from '../svg/Bookmark.svg';

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  border-top: 1px solid #ddd;
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
`;

const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.active ? colors.blueColor : colors.dark1Color)};

  -webkit-tap-highlight-color: transparent; 
  user-select: none;
`;

const Label = styled.span`
  font-family: "SF_Pro_Display_Bold";
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => (props.active ? colors.blueColor : colors.dark1Color)};
`;

const IconStyle = `
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
`;

const TrendIconStyled = styled(TrendIcon)`
  ${IconStyle}
  path {
    fill: ${(props) => (props.active ? colors.blueColor : colors.dark1Color)};
  }
`;

const HomeIconStyled = styled(HomeIcon)`
  ${IconStyle}
  path {
    fill: ${(props) => (props.active ? colors.blueColor : colors.dark1Color)};
  }
`;

const BookmarkIconStyled = styled(BookmarkIcon)`
  ${IconStyle}
  path {
    fill: ${(props) => (props.active ? colors.blueColor : colors.dark1Color)};
  }
`;

const Footer = () => {
  const [active, setActive] = useState('main');

  const handleClick = (tab) => {
    setActive(tab);
    alert('미구현 기능입니다.');
  };

  return (
    <FooterWrapper>
      <FooterItem active={active === 'trend'} onClick={() => handleClick('trend')}>
        <TrendIconStyled active={active === 'trend'} />
        <Label active={active === 'trend'}>트렌드</Label>
      </FooterItem>
      <FooterItem active={active === 'main'} onClick={() => handleClick('main')}>
        <HomeIconStyled active={active === 'main'} />
        <Label active={active === 'main'}>메인</Label>
      </FooterItem>
      <FooterItem active={active === 'bookmark'} onClick={() => handleClick('bookmark')}>
        <BookmarkIconStyled active={active === 'bookmark'} />
        <Label active={active === 'bookmark'}>북마크</Label>
      </FooterItem>
    </FooterWrapper>
  );
};

export default Footer;
