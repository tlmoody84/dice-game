// "use Client"
// import React, { useState } from "react";
// import Dice from "./dice"; // Import the Dice component
// import { getAllDocuments } from "../utils/firebaseUtils";
// import { db } from "../../../firebase.config"

"use client"
import React, { useState } from "react";
import Dice from "./dice"; // Import the Dice component

export default function ManagementPage(props) {
  const diceFaces = {
    1: "⚀",
    2: "⚀⚁",
    3: "⚀⚂",
    4: "⚀⚁⚂",
    5: "⚀⚁⚂⚃",
    6: "⚀⚁⚂⚃⚄",
  };

  return (
    <div className="dice">{diceFaces[props.value]}</div>
  );
}

 function Home() {
  const [numDice, setNumDice] = useState(1);
  const [rolls, setRolls] = useState([]);
  const [showRules, setShowRules] = useState(false);

  const handleNumberChange = (event) => {
    setNumDice(parseInt(event.target.value));
  };

  const handleRollDice = () => {
    const newRolls = [];
    for (let i = 0; i < numDice; i++) {
      newRolls.push(Math.floor(Math.random() * 6) + 1);
    }
    setRolls(newRolls);
  };

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div className="container mx-auto px-12 py-12 min-h-screen bg-black">
      <h1 className="text-7xl font-bold mb-20 text-center">Lets start ROLLING</h1>
      <div className="flex items-center mb-10">
        <label htmlFor="num-dice" className="mr-4">
          Number of Dice:
        </label>

        <input
  type="number"
  id="num-dice"
  value={numDice}
  onChange={handleNumberChange}
  min="1"
  max="8"  
  className="border rounded px-2 py-1 font-extrabold"
/>
      </div>
      <div className="flex justify-center mb-10">
        <button onClick={handleRollDice} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Roll Dice
        </button>
      </div>
      {rolls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rolls.map((roll, index) => (
            <diceFaces key={index} value={roll} />
          ))}
        </div>
      )}
      <button
  onClick={toggleRules}
  className={`text-blue-500 underline hover:bg-pink-500 hover:text-white`}
>
  {showRules ? "Hide Rules" : "Show Rules"}
</button>
      {showRules && (
        <div className="mt-4 bg-pink-500 text-green-500 rounded-md p-4">
          <h2>Dice Rolling Rules</h2>
          <p>
            This is a simple dice rolling game. You can choose to roll between 1
            and 6 dice. The result of each roll will be displayed as a die face.
            There are no specific winning or losing conditions. You can use this
            tool to generate random numbers for various purposes.
          </p>
        </div>
      )}
    </div>
  );
}



