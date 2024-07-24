// "use client"
// import React, { useState } from "react";
// import Dice from "./Dice"; // Assuming Dice.js is in the same directory
// // import DiceRoller from "./components/DiceRoller";

// function App() {
//   const [numDice, setNumDice] = useState(1);
//   const [rolls, setRolls] = useState([]);
//   const [showRules, setShowRules] = useState(false);
//   const [score, setScore] = useState(0);


//   const handleNumberChange = (event) => {
//     setNumDice(parseInt(event.target.value));
//   };

//   const handleRollDice = () => {
//     const newRolls = [];
//     for (let i = 0; i < numDice; i++) {
//       newRolls.push(Math.floor(Math.random() * 6) + 1);
//       localStorage.setItem('diceGameScore', score);

//     }
  
//     // Calculate total score from new rolls (replace with your scoring logic)
//     const rollTotal = newRolls.reduce((acc, roll) => acc + roll, 0);
//     setScore(score + rollTotal);
  
//     setRolls(newRolls);
//   };

//   const toggleRules = () => {
//     setShowRules(!showRules);
//   };

//   return (
//     <div className="container mx-auto px-12 py-12 min-h-screen bg-black">
//       <h1 className="text-7xl font-bold mb-20 text-center">Lets start ROLLING</h1>
//       <div className="flex items-center mb-10">
//         <label htmlFor="num-dice" className="mr-4">
//           Number of Dice:
//         </label>
//         <input
//           type="number"
//           id="num-dice"
//           value={numDice}
//           onChange={handleNumberChange}
//           min="1"
//           max="8"
//           className="border rounded px-2 py-1 font-extrabold bg-green-100 text-black"
//         />
//       </div>
//       <div className="flex justify-center mb-10">
//     <p className="text-xl font-bold text-white">Total Score: {score}</p>
//   </div>
//       <div className="flex justify-center mb-10">
//         <button onClick={handleRollDice} className="bg-green-500 text-white px-4 py-2 rounded-md">
//           Roll Dice
//         </button>
//       </div>
//       {rolls.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {rolls.map((roll, index) => (
//             <Dice key={index} value={roll} />
//           ))}
//         </div>
//       )}
//       <button
//         onClick={toggleRules}
//         className={`text-blue-500 underline hover:bg-pink-500 hover:text-white`}
//       >
//         {showRules ? "Hide Rules" : "Show Rules"}
//       </button>
//       {showRules && (
//         <div className="mt-4 bg-pink-400 text-black rounded-md p-4">
//           <h2>Dice Rolling Rules</h2>
//           <p>
//             This is a simple dice rolling game. You can choose to roll between 1
//             and 6 dice. The result of each roll will be displayed as a die face.
//             There are no specific winning or losing conditions. You can use this
//             tool to generate random numbers for various purposes.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;





























// "use client";
// import React, { useState } from "react";
// import Dice from "./Dice"; // Assuming Dice.js is in the same directory

// function App() {
//   const [numDice, setNumDice] = useState(1);
//   const [player1Rolls, setPlayer1Rolls] = useState([]);
//   const [player2Rolls, setPlayer2Rolls] = useState([]);
//   const [player1Score, setPlayer1Score] = useState(0);
//   const [player2Score, setPlayer2Score] = useState(0);
//   const [currentTurn, setCurrentTurn] = useState(1); // 1 for Player 1, 2 for Player 2
//   const [showRules, setShowRules] = useState(false);


//   const handleNumberChange = (event) => {
//     setNumDice(parseInt(event.target.value));
//   };

//   const handleRollDice = () => {
//     const newRolls = [];
//     for (let i = 0; i < numDice; i++) {
//       newRolls.push(Math.floor(Math.random() * 6) + 1);
//     }

//     const rollTotal = newRolls.reduce((acc, roll) => acc + roll, 0);

//     if (currentTurn === 1) {
//       setPlayer1Rolls([...player1Rolls, ...newRolls]);
//       setPlayer1Score(player1Score + rollTotal);
//     } else {
//       setPlayer2Rolls([...player2Rolls, ...newRolls]);
//       setPlayer2Score(player2Score + rollTotal);
//     }

//     setCurrentTurn(currentTurn === 1 ? 2 : 1); // Switch turns
//   };

//   const toggleRules = () => {
//     setShowRules(!showRules);
//   };

//   return (
//     <div className="container mx-auto px-12 py-12 min-h-screen bg-black">
//       <h1 className="text-7xl font-bold mb-20 text-center">Lets Start Rolling!</h1>
//       <div className="flex items-center mb-10">
//         <label htmlFor="num-dice" className="mr-4">
//           Number of Dice:
//         </label>
//         <input
//           type="number"
//           id="num-dice"
//           value={numDice}
//           onChange={handleNumberChange}
//           min="1"
//           max="8"
//           className="border rounded px-2 py-1 font-extrabold bg-green-100 text-black"
//         />
//       </div>
//       <div className="flex justify-between mb-10">
//         <p className="text-xl font-bold text-white">
//           Player 1 Score: {player1Score}
//         </p>
//         <p className="text-xl font-bold text-white">
//           Player 2 Score: {player2Score}
//         </p>
//       </div>
//       <div className="flex justify-center mb-10">
//         <button onClick={handleRollDice} className="bg-green-500 text-white px-4 py-2 rounded-md">
//           {currentTurn === 1 ? "Player 1 Roll" : "Player 2 Roll"}
//         </button>
//       </div>
//       {player1Rolls.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {player1Rolls.map((roll, index) => (
//             <Dice key={index} value={roll} />
//           ))}
//         </div>
//       )}
//       {player2Rolls.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {player2Rolls.map((roll, index) => (
//             <Dice key={index} value={roll} />
//           ))}
//         </div>
//       )}
//       <button onClick={toggleRules} className={`text-blue-500 underline hover:bg-pink-500 hover:text-white`}>
//         {showRules ? "Hide Rules" : "Show Rules"}
//       </button>
//       {showRules && (
//         <div className="mt-4 bg-pink-400 text-black rounded-md p-4">
//           <h2>Dice Rolling Rules</h2>
//           <p>This is a simple dice rolling game for two players. You can choose to roll between 1 and 6 dice per turn. The goal is to accumulate the highest score by rolling the dice and adding up the values. The player with the highest score at the end wins.</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

















"use client";
import React, { useState } from "react";
import Dice from "./Dice"; // Assuming Dice.js is in the same directory

function App() {
  const [numDice, setNumDice] = useState(1);
  const [player1Rolls, setPlayer1Rolls] = useState([]);
  const [player2Rolls, setPlayer2Rolls] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1); // 1 for Player 1, 2 for Player 2
  const [showRules, setShowRules] = useState(false);

  const handleNumberChange = (event) => {
    setNumDice(parseInt(event.target.value));
  };

  const handleRollDice = () => {
    const newRolls = [];
    for (let i = 0; i < numDice; i++) {
      newRolls.push(Math.floor(Math.random() * 6) + 1);
    }

    const rollTotal = newRolls.reduce((acc, roll) => acc + roll, 0);

    if (currentTurn === 1) {
      setPlayer1Rolls([...player1Rolls, ...newRolls]);
      setPlayer1Score(player1Score + rollTotal);
    } else {
      setPlayer2Rolls([...player2Rolls, ...newRolls]);
      setPlayer2Score(player2Score + rollTotal);
    }

    setCurrentTurn(currentTurn === 1 ? 2 : 1); // Switch turns
  };


  const handleRestartGame = () => {
    // Reset all game states
    setNumDice(1);
    setPlayer1Rolls([]);
    setPlayer2Rolls([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentTurn(1);
  };

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div className="container mx-auto px-12 py-12 min-h-screen bg-black">
      <h1 className="text-7xl font-bold mb-20 text-center">Lets Start Rolling!</h1>
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
          className="border rounded px-2 py-1 font-extrabold bg-green-100 text-black"
        />
      </div>
      <div className="flex justify-between mb-10">
        <p className="text-xl font-bold text-white">
          Player 1 Score: {player1Score}
        </p>
        <p className="text-xl font-bold text-white">
          Player 2 Score: {player2Score}
        </p>
      </div>
      <div className="flex justify-center mb-10">
        <button onClick={handleRollDice} className="bg-green-500 text-white px-4 py-2 rounded-md">
          {currentTurn === 1 ? "Player 1 Roll" : "Player 2 Roll"}
        </button>
        <button onClick={handleRestartGame} className="bg-red-500 text-white px-4 py-2 rounded-md ml-4">
          Restart Game
        </button>
      </div>
      {player1Rolls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {player1Rolls.map((roll, index) => (
            <Dice key={index} value={roll} />
          ))}
        </div>
      )}
      {player2Rolls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {player2Rolls.map((roll, index) => (
            <Dice key={index} value={roll} />
          ))}
        </div>
      )}
      <button onClick={toggleRules} className={`text-blue-500 underline hover:bg-pink-500 hover:text-white`}>
        {showRules ? "Hide Rules" : "Show Rules"}
      </button>
      {showRules && (
        <div className="mt-4 bg-pink-400 text-black rounded-md p-4">
          <h2>Dice Rolling Rules</h2>
          <p>This is a simple dice rolling game for two players. You can choose to roll between 1 and 6 dice per turn. The goal is to accumulate the highest score by rolling the dice and adding up the values. The player with the highest score at the end wins.</p>
        </div>
      )}
    </div>
  );
}

export default App;
