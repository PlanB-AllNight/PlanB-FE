import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.font.family};
    color: ${theme.colors.fontPrimary};
    background-color: ${theme.colors.background};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: bold;
  }

  button {
    font-family: inherit;
  }
`;