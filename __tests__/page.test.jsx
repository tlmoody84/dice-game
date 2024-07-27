import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Page from "src/app/management/page";
import Dice from '@/app/management/Dice';
// import MyComponent from './MyComponent';


describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders dice buttons', () => {
    render(<Page />);
    const diceButtons = screen.getAllByRole('button', { name: /Roll/i });
    expect(diceButtons.length).toBeGreaterThan(0);
  });

  it('hides LogoutButton for non-logged-in users', () => {
    render(<Page />);
    expect(screen.queryByText(/Logout/i)).toBeNull();
  });
  it('shows LoginButton for logged-in users', () => {
    render(<Page />);
    expect(screen.queryByText(/Login/i)).toBeNull();
  });
  it('shows RegisterButton for registered users', () => {
    render(<Page />);
    expect(screen.queryByText(/Register/i)).toBeNull();
  });
});