import styled from "styled-components";
import { blueColor } from "../component/colorConstants";
import { useState } from "react";
import KeywordModal from "./KeywordModal";

const ClickableWord = styled.span`
  color: ${blueColor};
  font-weight: bold;
  cursor: pointer;
`;

export const HighlightedArticle = ({ text, keyword_list }) => {
  const [selectedWord, setSelectedWord] = useState(null);

  const handleClick = (word) => {
    const fullWordObj = keyword_list.find((item) => item.word === word);
    if (fullWordObj) {
      setSelectedWord(fullWordObj); // 단순 문자열이 아닌 객체 자체를 넘김
    }
  };

  // 키워드 문자열 배열로 변환
  const words = keyword_list.map((item) => item.word);

  const parts = text.split(/(\s+)/).flatMap((part, index) => {
    // 배열 안에 배열이 생기므로 flatMap 사용
    const match = words.find((word) => part.startsWith(word));
    if (match) {
      const keyword = match;
      const rest = part.slice(keyword.length); // 조사 등 뒤에 붙은 문자
      return [
        <ClickableWord
          key={`${index}-단어`}
          onClick={() => {
            handleClick(keyword);
          }}
        >
          {keyword}
        </ClickableWord>,
        rest && <span key={`${index}-조사`}>{rest}</span>,
      ];
    }
    return <span key={index}>{part}</span>;
  });

  return (
    <>
      <div>{parts}</div>
      {selectedWord && (
        <KeywordModal
          wordObj={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </>
  );
};
