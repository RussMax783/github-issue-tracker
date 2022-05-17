import { useAuthToken } from "./providers/AuthToken";
import { Auth } from "./screens/Auth";
import { Repos } from "./screens/Repos";
import "./App.css";
import styled from "styled-components";

function App() {
  const { token } = useAuthToken();

  return (
    <AppWrapper>
      <Header>
        <Title>Github issue tracker</Title>
      </Header>

      {token ? <Repos /> : <Auth />}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  height: 100%;
`;
const Header = styled.div`
  background-color: #003e6b;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;

  @media (max-width: 768px) {
    flex-direction: 80px;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
`;

export default App;
