import React from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [isStarted, setIsStarted] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [rolls, setRolls] = React.useState(0);
  const bestTime = localStorage.getItem("bestTime");

  React.useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setTime((oldTime) => oldTime + 0.01);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isStarted]);
  React.useEffect(() => {
    if (
      dice.every((die) => die.value === dice[0].value) &&
      dice.every((die) => die.isHeld)
    ) {
      setTenzies(true);
      setIsStarted(false);
      if (!bestTime || time < bestTime) {
        localStorage.setItem("bestTime", time);
      }
    }
  }, [dice, bestTime, time]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setRolls((oldRolls) => oldRolls + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setIsStarted(false);
      setRolls(0);
      setTime(0);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
    if (!isStarted) {
      setIsStarted(true);
      setTime(0);
    }
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <div className="stats">
        <p>Rolls: {rolls}</p>
        <p>Time: {time.toFixed(2) + "s"}</p>
      </div>
      <div className="best-time">
        <p>
          Best Time &#128081;{" "}
          {(bestTime ? bestTime.slice(0, 5) : "00.00") + "s"}
        </p>
      </div>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button
        className="roll-dice"
        onClick={rollDice}
      >
        {tenzies
          ? "Play Again"
          : isStarted
          ? "Roll Dice"
          : "Click any die to start"}
      </button>
    </main>
  );
}
