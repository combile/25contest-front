import React, { useState } from "react";
import scss from "../styles/scss/LevelTest.module.scss";
import styled from "styled-components";
import * as colors from "../component/colorConstants.js";
import LockedLevelTestIndicator from "../component/LockedLevelTestIndicator.jsx";
import LevelTestIndicator from "../component/LevelTestIndicator.jsx";

const LevelTest = () => {
  const BlueText = styled.span`
    color: ${colors.blueColor};
  `;

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

export default LevelTest;
