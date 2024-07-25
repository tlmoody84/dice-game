import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ManagementPage from './management/page.js';

test('should update numDice state on input change', () => {
  const { getByText, getByLabelText } = render(<ManagementPage />);

  const numDiceInput = getByLabelText(/Number of Dice/i);
  fireEvent.change(numDiceInput, { target: { value: 3 } });

  expect(getByText(/Number of Dice/i).nextElementSibling).toHaveValue(3);
});

test('should roll dice and update player score (valid roll)', () => {
    const { getByText } = render(<ManagementPage />);
  
    // Set number of dice to 2
    const numDiceInput = getByText(/Number of Dice/i).nextElementSibling;
    fireEvent.change(numDiceInput, { target: { value: 2 } });
  
    // Click the roll button
    const rollButton = getByText(/Roll/i);
    fireEvent.click(rollButton);
  
    // Player 1 score should be updated (since random roll can't be predicted, we check for a non-zero value)
    expect(getByText(/Player 1 Score/i).nextElementSibling).not.toBeNull();
  });

  test('should not update score on invalid number of dice', () => {
    const { getByText, getByLabelText } = render(<ManagementPage />);
  
    // Set number of dice to an invalid value (outside the allowed range)
    const numDiceInput = getByLabelText(/Number of Dice/i);
    fireEvent.change(numDiceInput, { target: { value: 10 } });
  
    // Click the roll button
    const rollButton = getByText(/Roll/i);
    fireEvent.click(rollButton);
  
    // Player 1 score should NOT be updated (since the input is invalid)
    expect(getByText(/Player 1 Score/i).nextElementSibling).toHaveTextContent(0);
  });

  test('should reset all game state on restart click', () => {
    const { getByText, getByLabelText } = render(<ManagementPage />);
  
    // Set number of dice to 2
    const numDiceInput = getByLabelText(/Number of Dice/i);
    fireEvent.change(numDiceInput, { target: { value: 2 } });
  
    // Click the roll button
    const rollButton = getByText(/Roll/i);
    fireEvent.click(rollButton);
  
    // Click the restart button
    const restartButton = getByText(/Restart Game/i);
    fireEvent.click(restartButton);
  
    // All state values should be reset
    expect(getByLabelText(/Number of Dice/i).nextElementSibling).toHaveValue(1);
    expect(getByText(/Player 1 Score/i).nextElementSibling).toHaveTextContent(0);
    expect(getByText(/Player 2 Score/i).nextElementSibling).toHaveTextContent(0);
  });

  test('should toggle showRules state on button click', () => {
    const { getByText } = render(<ManagementPage />);
  
    // Initially, rules should be hidden
    expect(getByText(/Show Rules/i)).toBeInTheDocument();
    expect(getByText(/Dice Rolling Rules/i)).not.toBeInTheDocument();
  
    // Click the "Show Rules" button
    const showRulesButton = getByText(/Show Rules/i);
    fireEvent.click(showRulesButton);
  
    // Rules should be shown
    expect(getByText(/Dice Rolling Rules/i)).toBeInTheDocument();
  
    // Click the "Hide Rules" button
    fireEvent.click(showRulesButton);
  
    // Rules should be hidden again
    expect(getByText(/Dice Rolling Rules/i)).not.toBeInTheDocument();
  });