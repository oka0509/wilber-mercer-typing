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
import { Canvas } from "@react-three/fiber";

type Level = {
  level: number;
};

let timerId = -1;

const Game: FC<Level> = ({ level }) => {
  const targetWords = ["foo", "baz", "foobar", "hoge hoge", "aaa", "bbb"];

  const [targetWord, setTargetWord] = useState(targetWords[0]);
  const [currentChar, setCurrentChar] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * level);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    timerId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onOpen();
      clearInterval(timerId);
    }
  }, [timeLeft, onOpen]);

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
          clearInterval(timerId);
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
      <Canvas>
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
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
          <Center w="full">残り時間: {timeLeft}</Center>
        </CardFooter>
      </Card>
      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        timeLeft={timeLeft}
        level={level}
        errorCount={errorCount}
      />
    </>
  );
};

export default Game;
