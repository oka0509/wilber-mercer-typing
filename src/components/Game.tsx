import { FC, useState, useEffect } from "react";
import "./Game.css";
import {
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
} from "@chakra-ui/react";
import SuccessModal from "./SuccessModal";

type Level = {
  level: number;
};

const Game: FC<Level> = ({ level }) => {
  const targetWords = ["foo", "baz", "foobar", "hoge hoge", "aaa", "bbb"];

  const [targetWord, setTargetWord] = useState(targetWords[0]);
  const [currentChar, setCurrentChar] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const charSpans = document.querySelector("#textbox")!.children;
    charSpans[0].setAttribute("id", "current-letter");
    [...charSpans].forEach((e) => {
      e.classList.remove("typed-letters");
      e.classList.remove("typo-letters");
      e.classList.add("waiting-letters");
    });
  }, [targetWord]);

  const handleTargetWord = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const charSpans = document.querySelector("#textbox")!.children;
    //正しいキーが押されたとき
    if (e.key === targetWord[currentChar]) {
      //最後の文字に到達したとき
      if (currentChar + 1 === targetWord.length) {
        charSpans[currentChar].removeAttribute("id");
        charSpans[currentChar].classList.add("typed-letters");
        charSpans[currentChar].classList.remove("waiting-letters");
        if (currentIndex === targetWords.length - 1) {
          onOpen();
        } else {
          setCurrentChar(0);
          setTargetWord(targetWords[currentIndex + 1]);
          setCurrentIndex(currentIndex + 1);
        }
      }
      //途中の文字のとき
      else {
        charSpans[currentChar].removeAttribute("id");
        charSpans[currentChar + 1].setAttribute("id", "current-letter");
        charSpans[currentChar].classList.remove("waiting-letters");
        charSpans[currentChar].classList.add("typed-letters");
        setCurrentChar(currentChar + 1);
      }
    }
    //間違ったキーが押されたとき
    else {
      charSpans[currentChar].classList.remove("waiting-letters");
      charSpans[currentChar].classList.add("typo-letters");
      setErrorCount((cnt) => cnt + 1);
    }
  };

  return (
    <>
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
      <SuccessModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Game;
