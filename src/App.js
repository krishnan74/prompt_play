import React from "react";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lobby" element={<Lobby/>} ></Route>
    </Routes>
  </BrowserRouter>;
};

export default App;
