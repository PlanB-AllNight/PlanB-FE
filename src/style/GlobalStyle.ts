import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import reset from './reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.font.family};
    color: ${theme.colors.fontPrimary};
    background-color: ${theme.colors.background};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: bold;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* 스크롤바 숨기기 (웹킷 브라우저) */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 스크롤 기능은 유지하면서, 스크롤바만 숨기기 */
  body {
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */
  }
`;