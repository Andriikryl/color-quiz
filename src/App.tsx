import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [isWrongSelection, setIsWrongSelection] = useState(false);

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

  useEffect(() => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  }, []);

  function handleAnswerClicked(answer: string) {
    if (answer === color) {
      setIsWrongSelection(false);
    } else {
      setIsWrongSelection(true);
    }
  }

  return (
    <div className="App">
      <div className="answer-box">
        {isWrongSelection && <span className="answer-text">Wrong Answer</span>}
      </div>
      <div className="container" style={{ background: color }}></div>
      <div className="btn-box">
        {answers.map((answer) => (
          <>
            <button onClick={() => handleAnswerClicked(answer)}>
              {answer}
            </button>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
