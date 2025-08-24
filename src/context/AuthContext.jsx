/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import { loginUserService } from "../services/homeService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login: save user in state (not localStorage, so session resets on reload)
  const login = async (form) => {
    const { data } = await loginUserService(form);
    setUser(data);
  };

  // logout: clear state
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
