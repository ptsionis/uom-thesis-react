import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginView from "./views/LoginView/LoginView";
import HomeView from "./views/HomeView/HomeView";
import GameView from "./views/GameView/GameView";
import Loader from "./components/Loader/Loader";

import { checkIfAuthenticated } from "./utils/authUtils";
import socket from "./socketService";

export const AppContext = createContext(null);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [gameRoom, setGameRoom] = useState("");
  const [currentPage, setCurrentPage] = useState("/");
  const [isLoading, setIsLoading] = useState(true);

  const renderPage = () => {
    if (currentPage !== "/" && currentPage !== "game") {
      socket.emit("not_available");
    } else if (currentPage === "/") {
      socket.emit("available");
    }
    switch (currentPage) {
      case "/":
        return <HomeView />;
      case "game":
        return <GameView />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchAuthentication = async () => {
      try {
        const isAuthenticated = await checkIfAuthenticated();
        setIsAuthenticated(isAuthenticated);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthentication();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginView />
            ) : (
              <Navigate to={"/"} replace={true} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AppContext.Provider
                value={{
                  socket,
                  isAuthenticated,
                  setIsAuthenticated,
                  user,
                  setUser,
                  gameRoom,
                  setGameRoom,
                  setCurrentPage,
                }}
              >
                {renderPage()}
              </AppContext.Provider>
            ) : (
              <Navigate to={"/login"} replace={true} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
