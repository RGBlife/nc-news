import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("tickle122"); // Hardcoded until login functionlity is implemented.

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
