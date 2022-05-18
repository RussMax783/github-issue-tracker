import { useState } from "react";
import styled from "styled-components";
import { useAuthToken } from "../providers/AuthToken";

interface AuthProps {}

export function Auth({}: AuthProps) {
  const { setToken } = useAuthToken();

  const [tokenInput, setTokenInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const saveToken = () => {
    if (!tokenInput) {
      setErrorMsg("Please provide a Github auth token");
    } else {
      setToken(tokenInput);
    }
  };

  return (
    <AuthScreen>
      <h3>Enter your Github auth token to get started.</h3>
      <a href="https://github.com/settings/tokens">https://github.com/settings/tokens</a>
      {errorMsg && <span> {errorMsg}</span>}
      <AuthFormWrapper>
        <Input
          type="text"
          name="token"
          aria-label="Auth Token"
          placeholder="Auth Token"
          onChange={(e) => {
            setTokenInput(e.target.value);
          }}
        />
        <Button onClick={saveToken}>Load Repos</Button>
      </AuthFormWrapper>
    </AuthScreen>
  );
}

const AuthScreen = styled.div`
  margin-top: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 24px;
`;

const Input = styled.input`
  height: 42px;
  border: 1px solid #003e6b;
  font-size: 1em;
  color: #222;
  min-width: 250px;
  border-radius: 4px;
  padding: 0 8px;
`;

const Button = styled.button`
  color: #222;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 1px solid #003e6b;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  height: 44px;

  &:hover {
    background-color: #84c5f4;
  }
`;
