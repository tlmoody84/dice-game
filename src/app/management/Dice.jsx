import React from 'react';

const Dice = ({ value }) => {
  const diceFaces = {
    1: '⚀',
    2: '⚁',
    3: '⚂',
    4: '⚃',
    5: '⚄',
    6: '⚅',
  };

  return <span className="text-5xl font-bold">{diceFaces[value]}</span>;
};

export default Dice;