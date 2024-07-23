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

  return <span style={{ fontSize: '8rem' }} className="font-normal">{diceFaces[value]}</span>;};

export default Dice;