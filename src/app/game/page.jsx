"use client";
import React, { useState } from 'react';
import Dice from "./Dice";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from '../../../firebase.config'; 
import { useRouter } from 'next/navigation';

async function saveScore(userId, score) {
  const userRef = doc(db, 'users', userId);
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const existingScores = docSnap.data().scores || [];
      existingScores.push(score);
      await updateDoc(userRef, { scores: existingScores });
    } else {
      await setDoc(userRef, { scores: [score] });
    }
  } catch (error) {
    console.error("Error saving score:", error);
  }
}
async function getUserScores(userId) {
  const userRef = doc(db, 'users', userId);
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().scores || [];
    }
    return [];
  } catch (error) {
    console.error("Error getting user scores:", error);
    return [];
  }
}
function App() {
  const [numDice, setNumDice] = useState(1);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Rolls, setPlayer1Rolls] = useState([]);
  const [player2Rolls, setPlayer2Rolls] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [showRules, setShowRules] = useState(false);
  const router = useRouter();
  const handleNumberChange = (event) => {
    setNumDice(parseInt(event.target.value));
  };
  const handlePlayer1NameChange = (event) => {
    setPlayer1Name(event.target.value);
  };
  const handlePlayer2NameChange = (event) => {
    setPlayer2Name(event.target.value);
  };
  const handleRollDice = async () => {
    const newRolls = Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
    const rollTotal = newRolls.reduce((acc, roll) => acc + roll, 0);
    if (currentTurn === 1) {
      setPlayer1Rolls(prevRolls => [...prevRolls, ...newRolls]);
      setPlayer1Score(prevScore => prevScore + rollTotal);
    } else {
      setPlayer2Rolls(prevRolls => [...prevRolls, ...newRolls]);
      setPlayer2Score(prevScore => prevScore + rollTotal);
    }
    const gameRef = doc(db, 'games', 'yourGameId'); 
    try {
      await setDoc(gameRef, {
        player1Name,
        player2Name,
        player1Score,
        player2Score,
        player1Rolls,
        player2Rolls,
        currentPlayer: currentTurn,
        timestamp: new Date().toISOString(), 
      });
      console.log('Game state saved to Firestore');
    } catch (error) {
      console.error('Error saving game state:', error);
    }
    setCurrentTurn(currentTurn === 1 ? 2 : 1);
  };
  const handleRestartGame = () => {
    setNumDice(1);
    setPlayer1Rolls([]);
    setPlayer2Rolls([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentTurn(1);
  };
  const toggleRules = () => {
    setShowRules(prevShowRules => !prevShowRules);
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="container mx-auto px-12 py-12 min-h-screen bg-black flex">
      {/* Player Names Section */}
      <div className="w-1/2 flex flex-col items-center">
        <h1 className="text-7xl font-bold mb-20 text-center text-white">Lets Start Rolling!</h1>
        <div className="mb-10">
          <label htmlFor="player1-name" className="mr-4 text-white">
            Player 1 Name:
          </label>
          <input
            type="text"
            id="player1-name"
            value={player1Name}
            onChange={handlePlayer1NameChange}
            className="border rounded px-2 py-1 font-extrabold bg-green-100 text-black"
          />
        </div>
        <div className="mb-10">
          <label htmlFor="player2-name" className="mr-4 text-white">
            Player 2 Name:
          </label>
          <input
            type="text"
            id="player2-name"
            value={player2Name}
            onChange={handlePlayer2NameChange}
            className="border rounded px-2 py-1 font-extrabold bg-green-100 text-black"
          />
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 self-center">
          Logout
        </button>
      </div>
      {/* Dice Rolling and Scores Section */}
      <div className="w-1/2 flex flex-col items-center">
        <div className="flex justify-between mb-10 w-full">
          <p className="text-xl font-bold text-white">
            Player 1 Score: {player1Score}
          </p>
          <p className="text-xl font-bold text-white">
            Player 2 Score: {player2Score}
          </p>
        </div>
        <div className="flex items-center mb-10">
          <label htmlFor="num-dice" className="mr-4 text-white">
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
        <div className="flex justify-between mb-10 w-full">
          <button
            onClick={currentTurn === 1 ? handleRollDice : () => {}}
            disabled={currentTurn !== 1}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Player 1 Roll
          </button>
          <button
            onClick={currentTurn === 2 ? handleRollDice : () => {}}
            disabled={currentTurn !== 2}
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
          >
            Player 2 Roll
          </button>
          <button onClick={handleRestartGame} className="bg-red-500 text-white px-4 py-2 rounded-md ml-4">
            Restart Game
          </button>
        </div>
        {player1Rolls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {player1Rolls.map((roll, index) => (
              <Dice key={index} value={roll} />
            ))}
          </div>
        )}
        {player2Rolls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {player2Rolls.map((roll, index) => (
              <Dice key={index} value={roll} />
            ))}
          </div>
        )}
        <button onClick={toggleRules} className="text-blue-500 underline hover:bg-pink-500 hover:text-white">
          {showRules ? "Hide Rules" : "Show Rules"}
        </button>
        {showRules && (
          <div className="mt-4 bg-pink-400 text-black rounded-md p-4">
            <h2>Dice Rolling Rules</h2>
            <p>This is a simple dice rolling game for two players. You can choose to roll between 1 and 8 dice per turn. The goal is to accumulate the highest score by rolling the dice and adding up the values. The player with the highest score at the end wins.</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;