import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
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
    useState(false);

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const savedUser =
      localStorage.getItem("user");

    if (token && savedUser) {

      setIsLoggedIn(true);

      setUser(JSON.parse(savedUser));
    }

  }, []);

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