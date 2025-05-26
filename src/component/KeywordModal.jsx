import scss from "../styles/scss/KeywordModal.module.scss";
import styled from "styled-components";
import {
  blueColor,
  dark0Color,
  dark4Color,
  whiteColor,
} from "./colorConstants";

const ModalTitle = styled.p`
  color: ${dark4Color};
  font-size: 18px;
  font-weight: bold;
`;

const ClickedWord = styled.p`
  color: ${blueColor};
  font-size: 35px;
  font-weight: bold;
`;

const Label = styled.div`
  margin-left: 10px;
  font-size: 12px;
`;

const TextWrapper = styled.div`
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background: ${whiteColor};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 5px ${dark0Color};
`;

const CloseButton = styled.button`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);

  padding: 8px 40px;
  background-color: ${blueColor};

  border: none;
  border-radius: 20px;

  cursor: pointer;

  color: ${whiteColor};
  font-weight: bold;
  font-size: 14px;
`;

const KeywordModal = ({ wordObj, onClose }) => {
  if (!wordObj) return null;

  return (
    <>
      <div className={scss.blurBg} />
      <div className={scss.overlay} onClick={onClose}>
        <div
          className={scss.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={scss.headerContainer}>
            <ModalTitle>단어 설명</ModalTitle>
            <ClickedWord>{wordObj.word}</ClickedWord>
          </div>
          <div className={scss.definitionWrapper}>
            <Label>풀이</Label>
            <TextWrapper>{wordObj.definition}</TextWrapper>
          </div>
          <div className={scss.sentenceWrapper}>
            <Label>예문</Label>
            <TextWrapper>{wordObj.sentence}</TextWrapper>
          </div>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </div>
      </div>
    </>
  );
};

export default KeywordModal;
