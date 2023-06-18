import { FC, useState } from "react";
import "./Game.css";

type Level = {
  level: number;
};

const Game: FC<Level> = ({ level }) => {
  const [targetWord, setTargetWord] = useState("hogehoge");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const handleTargetWord = (e: React.KeyboardEvent<HTMLDivElement>) => {
    //正しいキーが押されたとき
    if (e.key === targetWord[currentIndex]) {
      if (currentIndex + 1 === targetWord.length) {
        setCurrentIndex(0);
        const randomWords = ["foo", "baz", "foobar", "hoge hoge", "aaa", "bbb"];
        setTargetWord(randomWords[Math.floor(Math.random() * 6)]);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
    //間違ったキーが押されたとき
    else {
      setErrorCount((cnt) => cnt + 1);
    }
  };

  return (
    <div>
      <h2>level: {level}</h2>
      <div onKeyDown={(e) => handleTargetWord(e)} tabIndex={0} autoFocus>
        <span className="typed-letters">
          {targetWord.slice(0, currentIndex)}
        </span>
        <span className="waiting-letters">
          {targetWord.slice(currentIndex)}
        </span>
      </div>
      <p>number of errors: {errorCount}</p>
    </div>
  );
};

export default Game;
