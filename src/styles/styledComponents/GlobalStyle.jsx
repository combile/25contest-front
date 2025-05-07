// Styled-Component
// 기본적인 css 세팅.

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans', sans-serif;
    background-color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  ul, ol, li {
    list-style: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  input, textarea {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
  }
`;

export default GlobalStyle;
