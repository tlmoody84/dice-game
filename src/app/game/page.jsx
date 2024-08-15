"use client";
import React, { useState } from 'react';
import Dice from "./Dice";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { auth } from "../../../firebase.config"; // Adjust the path as needed
import { getAllDocuments, addDocument, deleteDocument, updateDocument } from "@/utils/firebaseUtils";

const App = () => {
  const [numDice, setNumDice] = useState(1);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Rolls, setPlayer1Rolls] = useState([]);
  const [player2Rolls, setPlayer2Rolls] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [showRules, setShowRules] = useState(false);
  const handleNumberChange = (event) => {
    setNumDice(parseInt(event.target.value, 10));
  };
  const handlePlayer1NameChange = (event) => {
    setPlayer1Name(event.target.value);
  };
  const handlePlayer2NameChange = (event) => {
    setPlayer2Name(event.target.value);
  };
  const handleRollDice = async () => {
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
    const db = firebase.firestore();
    const gameRef = db.collection('games').doc('yourGameId');
    try {
      await gameRef.set({
        player1Name,
        player2Name,
        player1Score,
        player2Score,
        player1Rolls,
        player2Rolls,
        currentPlayer: currentTurn,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
    setShowRules(!showRules);
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      // Optionally, redirect the user or perform other actions after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="container mx-auto px-12 py-12 min-h-screen bg-black flex">
      {/* Player Names Section */}
      <div className="w-1/2 flex flex-col items-center">
        <h1 className="text-7xl font-bold mb-20 text-center">Lets Start Rolling!</h1>
        {/* Input field for player 1 name */}
        <div className="mb-10">
          <label htmlFor="player1-name" className="mr-4">
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
        {/* Input field for player 2 name */}
        <div className="mb-10">
          <label htmlFor="player2-name" className="mr-4">
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
        {/* Logout Button */}
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
          Logout
        </button>
      </div>
      {/* Dice Rolling and Scores Section */}
      <div className="w-1/2 flex flex-col items-center">
        <div className="flex justify-between mb-10">
          <p className="text-xl font-bold text-white">
            Player 1 Score: {player1Score}
          </p>
          <p className="text-xl font-bold text-white">
            Player 2 Score: {player2Score}
          </p>
        </div>
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
            <p>This is a simple dice rolling game for two players. You can choose to roll between 1 and 8 dice per turn. The goal is to accumulate the highest score by rolling the dice and adding up the values. The player with the highest score at the end wins. You can determine the highest roll to end the game.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;







