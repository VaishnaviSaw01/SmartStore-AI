/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  login: (
    token: string,
    user: User
  ) => void;
  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isLoggedIn, setIsLoggedIn] =
    useState<boolean>(() => {
      const token = localStorage.getItem("token");
      return !!token;
    });

  const [user, setUser] =
    useState<User | null>(() => {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    });

  const [loading] = useState(false);

  const login = (
    token: string,
    user: User
  ) => {
    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be inside provider"
    );
  }

  return context;
}