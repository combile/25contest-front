import React, { useState } from "react";
import scss from "../styles/scss/LevelCheck.module.scss";
import styled from "styled-components";
import * as colors from "../component/colorConstants.js";
import LockedLevelTestIndicator from "../component/LockedLevelTestIndicator.jsx";
import LevelTestIndicator from "../component/LevelTestIndicator.jsx";

// TODO
// DUMMY_USER.js 를 utils 폴더에 만들어서 그거에 맞게 다시 바인딩 해놓기
// ArticleDetail.jsx 에 AI 관련 기능 추가 구현하기 (플로팅 버튼, 모달)

const BlueText = styled.span`
  color: ${colors.blueColor};
`;

const LevelCheck = () => {
  const username = "아무개";
  const [testAvailability, setTestAvailability] = useState(true);

  return (
    <main className={scss.wrapper}>
      <div className={scss.textBox}>
        <BlueText>{username}</BlueText>님의 어휘 레벨은
      </div>
      {testAvailability ? <LevelTestIndicator /> : <LockedLevelTestIndicator />}
    </main>
  );
};

export default LevelCheck;
