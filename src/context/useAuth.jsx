import { createContext, useContext, useState, useEffect } from "react";

// 1. Tạo context
const AuthContext = createContext(null);

// 2. Provider phải là function declaration
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (token, userData) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  const loadDetails = async (fetchDetailsFn) => {
    if (!user) return;
    const details = await fetchDetailsFn(user.roleId);
    const updatedUser = { ...user, ...details };
    if (JSON.stringify(user) !== JSON.stringify(updatedUser)) {
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return <AuthContext.Provider value={{ user, login, logout, loadDetails }}>{children}</AuthContext.Provider>;
}

// 3. Hook cũng function declaration
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
