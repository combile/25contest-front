import React, { useEffect, useState } from "react";
import api from "../component/axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const TestDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90dvh;
`;

const Test = () => {
  const { uuid } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const getComment = async () => {
      await api
        .get(`comment/comments/${uuid}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getComment();
  }, []);

  return (
    <TestDiv>
      {data?.map((item) => (
        <div key={item.commentId}>
          <p>{item.comment}</p>
          <p>{item.createdAt}</p>
          <br />
        </div>
      ))}
    </TestDiv>
  );
};

export default Test;
