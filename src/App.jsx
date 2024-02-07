import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Github from "./assets/Github-logo.png";
import Confetti from 'react-confetti'
import './App.css'
import Die from "./die.jsx";
export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, settenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      settenzies(true)
    }
  }, [dice])
  function allNewDice() {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      });
    }
    return diceArr;
  }
  function rollDice() {
    if(!tenzies){
      setDice(oldDice => oldDice.map(dice => {
        return dice.isHeld ? dice : {value: Math.ceil(Math.random() * 6), isHeld: dice.isHeld, id: nanoid()}       
      }));
      setRollCount(prevState => prevState + 1); 
    }
    else{
      settenzies(false)
      setDice(allNewDice())
      setRollCount(0);
    }
  }
  function holdDice(id) {
    setDice(oldDice => oldDice.map(dice => {
      return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    }))
  }
  const diceElement = dice.map(num => (<Die key={num.id} value={num.value} isHeld={num.isHeld} holdDice={() => holdDice(num.id)} />))

  return (
    <>
    <main>
      {tenzies && <Confetti /> }
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all the dice are the same. Click each die to freeze it and its current value between rolls</p>
      <div className="dice-container">
        {diceElement}
      </div>
      <button className="roll-btn" onClick={rollDice}>{tenzies ? "New Game?" : "Roll"}</button>
      <p className="roll-count">Roll Count: {rollCount} </p>
    </main>
    <div className="about">
        <h1 className="about-title">About Game</h1>
        <p className="about-para">Test your luck and strategy in Tenzies Dice, a fast-paced React game! Roll 10 dice and hold some to try and get all of them showing the same number. Every roll counts, so plan your moves carefully to win with the fewest rolls. Can you beat your own best score or challenge your friends? Play now and roll your way to victory!</p>
        <h3 className="dev">Developed By: <span className="dev-span">Aman Shahid</span></h3>
        <h3 className="github-code">Code:<a href="https://github.com/dev-sire/ReactTenziesGame"><img src={Github} alt="" /></a></h3>
    </div>
    </>

  )
}
