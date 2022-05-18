import { createContext, useContext, useState } from "react";

interface AuthTokenContext {
  token: string;
  setToken: (token: string) => void;
}

export const AuthToken = createContext<AuthTokenContext>({
  token: "",
  setToken: () => {},
});

export const useAuthToken = (): AuthTokenContext => useContext(AuthToken);

interface AuthTokenProviderProps {
  children: React.ReactNode;
}

export function AuthTokenProvider({ children }: AuthTokenProviderProps) {
  const [token, setToken] = useState("");

  return <AuthToken.Provider value={{ token, setToken }}>{children}</AuthToken.Provider>;
}
