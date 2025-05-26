import React, { useEffect, useState } from "react";
import scss from "../styles/scss/LevelCheck.module.scss";
import styled from "styled-components";
import * as colors from "../component/colorConstants.js";
import LockedLevelTestIndicator from "../component/LockedLevelTestIndicator.jsx";
import LevelTestIndicator from "../component/LevelTestIndicator.jsx";
import api from "../component/axios.js";

const BlueText = styled.span`
  color: ${colors.blueColor};
`;

const LevelCheck = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [testAvailability, setTestAvailability] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await api.get("/app-user/users");
        const user = res.data;

        // 상태 반영
        setUserInfo(user);
        setTestAvailability(user.views >= 5);
      } catch (e) {
        console.error("유저 정보 로딩 실패", e);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) return <div>Loading...</div>;

  return (
    <main className={scss.wrapper}>
      <div className={scss.textBox}>
        <BlueText>{userInfo.username}</BlueText>님의 어휘 레벨은
      </div>
      {testAvailability ? (
        <LevelTestIndicator vocaLevel={userInfo.vocabularyLevel} />
      ) : (
        <LockedLevelTestIndicator />
      )}
    </main>
  );
};

export default LevelCheck;
