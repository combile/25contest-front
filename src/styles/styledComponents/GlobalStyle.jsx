// Styled-Component
// 기본적인 css 세팅.

import { createGlobalStyle } from "styled-components";

import SFProDisplayBold from '../fonts/sf-pro-display-bold.woff2'
import SFProDisplayLight from '../fonts/sf-pro-display-light.woff2'
import SFProDisplayRegular from '../fonts/sf-pro-display-regular.woff2'
import MediaSansBold from '../fonts/Media-Sans-Bold.woff2'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100dvw;
    height: 100dvh;
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
  
  @font-face {
        font-family: 'SFProDisplayBold';
        src: url(${SFProDisplayBold}) format('truetype');
  }
  @font-face {
        font-family: 'SFProDisplayLight';
        src: url(${SFProDisplayLight}) format('truetype');
  }
  @font-face {
        font-family: 'SFProDisplayRegular';
        src: url(${SFProDisplayRegular}) format('truetype');
  }
  @font-face {
        font-family: 'MediaSansBold';
        src: url(${MediaSansBold}) format('truetype');
  }
`;

export default GlobalStyle;