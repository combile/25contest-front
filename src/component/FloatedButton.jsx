import React from "react";
import scss from "../styles/scss/FloatedButton.module.scss";
import { ReactComponent as RobotIcon } from "../svg/robot.svg";

const FloatedButton = ({ onClick }) => {
  return (
    <div className={scss.floatAIBtn} onClick={onClick}>
      <RobotIcon />
    </div>
  );
};

export default FloatedButton;
