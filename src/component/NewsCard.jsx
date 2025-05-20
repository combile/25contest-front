import React from "react";
import styled from "styled-components";

import scss from "../styles/scss/NewsCard.module.scss";

import * as colors from "../component/colorConstants";
import "../styles/styledComponents/GlobalStyle";

import { ReactComponent as View } from "../svg/view.svg";

const Title = styled.div`
  font-family: "SFProDisplayBold";
  font-size: 14px;
  color: ${colors.dark4Color};
  margin-bottom: 10px;
`;

const Tags = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
`;

const Tag = styled.span`
  background-color: ${colors.grayColor};
  color: ${colors.dark2Color};
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  line-height: 1;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 4px;
`;

const LeftColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-right: 30px;
`;

const RightColumn = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 16px;
  overflow: hidden;
  margin-left: 10px;
  flex-shrink: 0;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NewsCard = ({
  id,
  title,
  tag1,
  tag2,
  view,
  source,
  time,
  profileUrl,
}) => {
  return (
    <div className={scss.cardWrapper}>
      <LeftColumn>
        <Title>{title}</Title>
        <Tags>
          <Tag>{tag1}</Tag>
          <Tag>{tag2}</Tag>
        </Tags>
        <Info>
          <div className={scss.cardInfoLeft}>
            <div className={scss.cardViewGroup}>
              <View />
              <span>{view.toLocaleString()}</span>
            </div>
            · {source} · {time}
          </div>
        </Info>
      </LeftColumn>

      <RightColumn>
        <ProfileImg src={profileUrl} alt="profile" />
      </RightColumn>
    </div>
  );
};

export default NewsCard;
