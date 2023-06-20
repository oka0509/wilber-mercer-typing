import { FC, useState, useEffect } from "react";
import "./Game.css";
import {
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

type Level = {
  level: number;
};

const Game: FC<Level> = ({ level }) => {
  const [targetWord, setTargetWord] = useState("first");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [targetWords, setTargetWords] = useState<string[]>([]);

  useEffect(() => {
    setTargetWords(["foo", "baz", "foobar", "hoge hoge", "aaa", "bbb"]);
  }, []);

  useEffect(() => {
    const charSpans = document.querySelector("#textbox")!.children;
    [...charSpans].forEach((e) => {
      e.classList.remove("typed-letters");
      e.classList.remove("typo-letters");
      e.classList.add("waiting-letters");
    });
  }, [targetWord]);

  const handleTargetWord = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const charSpans = document.querySelector("#textbox")!.children;
    //正しいキーが押されたとき
    if (e.key === targetWord[currentIndex]) {
      if (currentIndex + 1 === targetWord.length) {
        setCurrentIndex(0);
        setTargetWord(
          targetWords[Math.floor(Math.random() * targetWords.length)]
        );
      } else {
        charSpans[currentIndex].classList.remove("waiting-letters");
        charSpans[currentIndex].classList.add("typed-letters");
        setCurrentIndex(currentIndex + 1);
      }
    }
    //間違ったキーが押されたとき
    else {
      charSpans[currentIndex].classList.remove("waiting-letters");
      charSpans[currentIndex].classList.add("typo-letters");
      setErrorCount((cnt) => cnt + 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2>level: {level}</h2>
      </CardHeader>
      <CardBody fontSize="5xl">
        <div
          id="textbox"
          onKeyDown={(e) => handleTargetWord(e)}
          tabIndex={0}
          autoFocus
        >
          {targetWord.split("").map((char, idx) => (
            <span key={idx}>{char}</span>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <Center w="full">number of errors: {errorCount}</Center>
      </CardFooter>
    </Card>
  );
};

export default Game;
