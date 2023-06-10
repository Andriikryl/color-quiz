import { useEffect, useState } from "react";
import "./App.css";

const getRandomColor = () => {
  const digits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  const color = new Array(6)
    .fill("")
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join("");
  return `#${color}`;
};

enum Resul {
  Correct,
  Wrong,
}

function App() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [isWrongSelection, setIsWrongSelection] = useState<Resul | undefined>(
    undefined
  );

  const pickColor = () => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  useEffect(() => {
    pickColor();
  }, []);

  const handleAnswerClicked = (answer: string) => {
    if (answer === color) {
      setIsWrongSelection(Resul.Correct);
      setTimeout(() => {
        pickColor();
      }, 1000);
      setTimeout(() => {
        setIsWrongSelection(undefined);
      }, 1000);
    } else {
      setIsWrongSelection(Resul.Wrong);
    }
  };

  return (
    <div className="App">
      <div className="answer-box">
        {isWrongSelection === Resul.Wrong && (
          <span className="answer-text">Wrong Answer</span>
        )}
        {isWrongSelection === Resul.Correct && (
          <span className="answer-text | correct">Correct Answer</span>
        )}
      </div>
      <div className="container" style={{ background: color }}></div>
      <div className="btn-box">
        {answers.map((answer) => (
          <>
            <button onClick={() => handleAnswerClicked(answer)} key={answer}>
              {answer}
            </button>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
