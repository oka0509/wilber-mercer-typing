import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Game from "./components/Game";
import Home from "./components/Home";

const App: FC = () => {
  return (
    <>
      <h1>Typing game</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="1" element={<Game level={1} />} />
          <Route path="2" element={<Game level={2} />} />
          <Route path="3" element={<Game level={3} />} />
        </Routes>
    </>
  );
};

export default App;
