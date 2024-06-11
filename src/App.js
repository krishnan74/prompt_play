import React from "react";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Play from "./pages/Play";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />}></Route>
        <Route path="/newGame" element={<Play />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
