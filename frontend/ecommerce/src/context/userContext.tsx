import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  email: string | null;
  token: string | null;
  login: (userName: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({email: null, token: null, login: () => {} , logout: () => {}});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  function login(email: string, token: string) {
    setEmail(email);
    setToken(token);
    localStorage.setItem("email" , email);
    localStorage.setItem("token" , token);
  }

  function logout(){
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setEmail(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ email, token, login , logout }}>
      {children}
    </AuthContext.Provider>
  );
}
