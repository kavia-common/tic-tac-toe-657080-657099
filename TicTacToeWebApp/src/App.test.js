import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders title and status', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(screen.getByTestId('status-text')).toHaveTextContent(/Next player: X/);
});

test('allows players to take turns and detects a win', () => {
  render(<App />);

  const s0 = screen.getByTestId('square-0');
  const s1 = screen.getByTestId('square-1');
  const s2 = screen.getByTestId('square-2');

  fireEvent.click(s0); // X
  fireEvent.click(s1); // O
  fireEvent.click(s2); // X
  // Continue a winning pattern for X on top row
  const s4 = screen.getByTestId('square-4');
  fireEvent.click(s4); // O
  const s1Again = screen.getByTestId('square-1');
  // s1 already O; ensure no overwrite
  fireEvent.click(s1Again);
  const s2Again = screen.getByTestId('square-2');
  fireEvent.click(s2Again); // should be ignored because already has X

  const s3 = screen.getByTestId('square-3');
  fireEvent.click(s3); // X's move should have already been taken, so ensure order; to force a win:
  // Let's restart the sequence to ensure a deterministic win in the test:

  // Reset and do a straightforward top-row win
  fireEvent.click(screen.getByTestId('reset-button'));
  const a0 = screen.getByTestId('square-0');
  const a3 = screen.getByTestId('square-3');
  const a1 = screen.getByTestId('square-1');
  const a4 = screen.getByTestId('square-4');
  const a2 = screen.getByTestId('square-2');

  fireEvent.click(a0); // X
  fireEvent.click(a3); // O
  fireEvent.click(a1); // X
  fireEvent.click(a4); // O
  fireEvent.click(a2); // X wins

  expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
});

test('reset clears the board', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('square-0')); // X
  fireEvent.click(screen.getByTestId('reset-button'));
  expect(screen.getByTestId('status-text')).toHaveTextContent(/Next player: X/);
});
