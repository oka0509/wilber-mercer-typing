import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Game from "./components/Game";

const App: FC = () => {
  return (
    <>
      <h1>Typing game</h1>
      <BrowserRouter>
        <Routes>
          <Route path="1" element={<Game level={1} />} />
          <Route path="2" element={<Game level={2} />} />
          <Route path="3" element={<Game level={3} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
