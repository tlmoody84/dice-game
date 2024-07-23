import React from "react";

function Dice({ value }) {
  const diceFaces = {
    1: "⚀",
    2: "⚁",
    3: "⚂",
    4: "⚃",
    5: "⚄",
    6: "⚅",
  };

  return (
    <div className="dice">{diceFaces[value]}</div>
  );
}

export default Dice;