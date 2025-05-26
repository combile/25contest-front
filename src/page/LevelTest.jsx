import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleFooterVisible, toggleHeaderVisible } from "../store";
import api from "../component/axios";
import CircularProgress from "../component/CircularProgress";
import scss from "../styles/scss/LevelTest.module.scss";
import * as colors from "../component/colorConstants";

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.blueColor};
`;

const SuggestedVoca = styled.p`
  color: ${colors.blueColor};
  font-weight: bold;
  font-size: 3.1rem;
  line-height: 1;
`;

const Question = styled.p`
  color: ${colors.dark5Color};
  font-weight: bold;
`;

const CurvedLine = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50px;
  width: 100%;
  border: none;
  border-top: 1px solid ${colors.blueColor};
  border-radius: 40px;
`;

const SelectButton = styled.button`
  border-radius: 15px;
  box-shadow: 0px 0px 4px ${colors.dark1Color};
  width: 300px;
  padding: 8px 0px;
  text-align: center;
  margin: 10px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: 0.2s;

  &:disabled {
    background-color: ${colors.grayColor};
    color: ${colors.dark1Color};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const LevelTest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quizzes, setQuizzes] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get("/quiz/several-quiz");
        setQuizzes(res.data);
        dispatch(toggleFooterVisible(false));
        dispatch(toggleHeaderVisible(false));
      } catch (e) {
        console.error("퀴즈 로딩 실패:", e);
      }
    };
    fetchQuizzes();
  }, [dispatch]);

  const handleSelect = async (optionIndex) => {
    const currentQuiz = quizzes[currentIdx];
    const updatedAnswers = [
      ...answers,
      { quizId: currentQuiz.quizId, selectValue: optionIndex },
    ];
    setAnswers(updatedAnswers);
    console.log(answers);

    if (currentIdx === quizzes.length - 1) {
      dispatch(toggleFooterVisible(true));
      dispatch(toggleHeaderVisible(true));

      try {
        const grading = await api.post("/quiz-result/grading", {
          quizIdAndSelectValueList: updatedAnswers,
        });
        console.log(grading.data);

        navigate("/main", { replace: true });
      } catch (e) {
        console.error("채점 실패:", e);
      }
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  if (quizzes.length === 0) return <div>Loading...</div>;

  const current = quizzes[currentIdx];
  const options = [
    current.optionOne,
    current.optionTwo,
    current.optionThree,
    current.optionFore,
  ];

  return (
    <div className={scss.wrapper}>
      <div className={scss.indicatorFlexBox}>
        <div className={scss.textBox}>
          <SuggestedVoca>{current.question}</SuggestedVoca>
          <Line />
          <Question>유사한 뜻이 아닌 단어는?</Question>
        </div>
        <CircularProgress />
      </div>
      <CurvedLine />
      <div className={scss.selectionWrapper}>
        {options.map((option, idx) => (
          <SelectButton
            key={idx}
            disabled={answers.length >= quizzes.length}
            onClick={() => handleSelect(idx + 1)}
          >
            {option}
          </SelectButton>
        ))}
      </div>
    </div>
  );
};

export default LevelTest;
