"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUserData } from "../services/auth";
import Loading from "../components/Loading";

interface User {
  name: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUserData()
      .then((data) => {
        setUser(data?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const login = async () => {
    const userData = await getUserData();
    setUser(userData?.data);
  };
  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, isLoading, isAuthenticated }}
    >
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
