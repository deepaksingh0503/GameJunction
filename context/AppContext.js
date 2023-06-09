import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppState = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        msg: "Namaste Dunia!",
        isLoggedIn: loggedIn,
        setLoggedIn,
        handleLogout,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
