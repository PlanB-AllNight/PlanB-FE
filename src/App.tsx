import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary[500]};
  font-family: ${({ theme }) => theme.font.family};
`;

function App() {
  return <Title>Hello Inter 👋</Title>;
}

export default App;