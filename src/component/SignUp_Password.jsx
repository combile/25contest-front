import React, { useState, useEffect } from "react";
import api from "./axios";
import InputField from ".//InputField";
import ConfirmButton from "./ConfirmButton";

import { ReactComponent as BackIcon } from "../svg/backicon.svg";
import { ReactComponent as CheckIcon } from "../svg/checkicon.svg";
import { ReactComponent as DeniedIcon } from "../svg/deniedicon.svg";

import styled from "styled-components";
import scss from "../styles/scss/SignUpInfo.module.scss";

const PaginationContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
`;

const PaginationDot = styled.div`
  height: 8px;
  width: ${(props) => (props.active ? "24px" : "8px")};
  margin: 0 4px;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? "#336AF8" : "#ACACAC")};
  transition: all 0.3s ease;
`;

const SignUpPassword = ({ onSubmit, onBack, currentStep }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isIdValid, setIsIdValid] = useState(null);
  const [isPwValid, setIsPwValid] = useState(null);
  const [isConfirmValid, setIsConfirmValid] = useState(null);

  useEffect(() => {
    const valid = isIdValid && isPwValid && isConfirmValid;
    setIsFormValid(valid);
  }, [isIdValid, isPwValid, isConfirmValid]);

  const [isFormValid, setIsFormValid] = useState(false);

  const handleIdChange = async (e) => {
    const val = e.target.value;
    setId(val);
    if (val.length < 3) {
      setIdError("아이디는 3자 이상이어야 합니다.");
      setIsIdValid(false);
      return;
    }
    try {
      const res = await api.post("/app-user/initial/redundancy-check", {
        loginId: val,
      });
      if (res.data === true) {
        setIdError("이미 가입된 아이디입니다.");
        setIsIdValid(false);
      } else {
        setIdError("");
        setIsIdValid(true);
      }
    } catch {
      setIdError("서버 오류가 발생했습니다.");
      setIsIdValid(false);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setPwError("");
      setIsPwValid(null);
    } else if (!/[A-Z!@#$%^&*]/.test(value)) {
      setPwError("특수문자, 대문자 중 하나 이상을 포함해주세요.");
      setIsPwValid(false);
    } else {
      setPwError("");
      setIsPwValid(true);
    }

    if (confirm !== "") {
      if (confirm !== value) {
        setConfirmError("비밀번호가 일치하지 않습니다.");
        setIsConfirmValid(false);
      } else {
        setConfirmError("");
        setIsConfirmValid(true);
      }
    }
  };

  const handleConfirmChange = (e) => {
    const val = e.target.value;
    setConfirm(val);
    if (val !== password) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      setIsConfirmValid(false);
    } else {
      setConfirmError("");
      setIsConfirmValid(true);
    }
  };

  const handleSubmit = () => {
    if (isFormValid) onSubmit({ id, password });
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.topBar}>
        <button onClick={onBack}>
          <BackIcon width={20} height={20} style={{ marginLeft: "5px" }} />
        </button>
        <PaginationContainer>
          <PaginationDot active={currentStep === 0} />
          <PaginationDot active={currentStep === 1} />
        </PaginationContainer>
      </div>
      <div className={scss.container}>
        <div className={scss.Title}>아이디와 비밀번호를</div>
        <div className={scss.SubTitle}>입력하세요</div>
        <InputField
          label="아이디"
          value={id}
          onChange={handleIdChange}
          isValid={isIdValid}
          errorMessage={idError}
          successMessage="사용 가능한 아이디입니다"
          Icon={isIdValid ? CheckIcon : DeniedIcon}
        />
        <InputField
          label="비밀번호"
          value={password}
          type="password"
          onChange={handlePasswordChange}
          isValid={isPwValid}
          errorMessage={pwError}
          successMessage="사용 가능한 비밀번호입니다"
          Icon={isPwValid ? CheckIcon : DeniedIcon}
        />
        <InputField
          label="비밀번호 확인"
          value={confirm}
          type="password"
          onChange={handleConfirmChange}
          isValid={isConfirmValid}
          errorMessage={confirmError}
          successMessage="비밀번호가 일치합니다"
          Icon={isConfirmValid ? CheckIcon : DeniedIcon}
        />
      </div>
      <div className={scss.buttonWrapper}>
        <ConfirmButton onClick={handleSubmit} disabled={!isFormValid}>
          확인
        </ConfirmButton>
      </div>
    </div>
  );
};

export default SignUpPassword;
