import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Root App component that renders a responsive Tic Tac Toe game.
 * - Renders a 3x3 board
 * - Alternating turns (Player X and O)
 * - Win/draw detection and status display
 * - Reset button
 * - Light/Dark theme toggle
 */
function App() {
  const [theme, setTheme] = useState('light');

  // Game state
  const [board, setBoard] = useState(Array(9).fill(null)); // 0..8
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('Next player: X');

  // Apply theme to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Determine winner and draw using memoization for performance/readability
  const winnerInfo = useMemo(() => calculateWinner(board), [board]);
  const isBoardFull = useMemo(() => board.every((c) => c !== null), [board]);
  const isDraw = useMemo(() => !winnerInfo && isBoardFull, [winnerInfo, isBoardFull]);

  // Update status whenever related state changes
  useEffect(() => {
    if (winnerInfo) {
      setStatus(`Winner: ${winnerInfo.winner}`);
    } else if (isDraw) {
      setStatus(`It's a draw!`);
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`);
    }
  }, [winnerInfo, isDraw, xIsNext]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    // If there is already a winner or the square is filled, ignore
    if (winnerInfo || board[index]) return;

    setBoard((prev) => {
      const next = [...prev];
      next[index] = xIsNext ? 'X' : 'O';
      return next;
    });
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="App">
      <header className="ttt-header">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="ttt-container" role="main">
        <section className="ttt-status" aria-live="polite">
          <div className="status-line">
            <span data-testid="status-text">{status}</span>
          </div>
          <div className="indicators">
            <PlayerBadge label="Player X" active={!winnerInfo && !isDraw && xIsNext} symbol="X" />
            <PlayerBadge label="Player O" active={!winnerInfo && !isDraw && !xIsNext} symbol="O" />
          </div>
        </section>

        <Board
          board={board}
          onSquareClick={handleSquareClick}
          gameOver={Boolean(winnerInfo) || isDraw}
        />

        <section className="ttt-actions">
          <button
            className="btn btn-reset"
            onClick={resetGame}
            aria-label="Reset the game"
            data-testid="reset-button"
          >
            Reset
          </button>
        </section>

        {winnerInfo && (
          <section className="ttt-summary" role="status" aria-live="polite">
            <p className="summary-line">
              Player <strong>{winnerInfo.winner}</strong> wins!
            </p>
            <WinningLineInfo line={winnerInfo.line} />
          </section>
        )}

        {isDraw && !winnerInfo && (
          <section className="ttt-summary" role="status" aria-live="polite">
            <p className="summary-line">No more moves. It's a draw!</p>
          </section>
        )}
      </main>

      <footer className="ttt-footer">
        <small>Built with React • No backend required</small>
      </footer>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Presentational component for player indicator.
 */
function PlayerBadge({ label, active, symbol }) {
  return (
    <div
      className={`player-badge ${active ? 'active' : ''}`}
      aria-current={active ? 'step' : undefined}
    >
      <span className="player-symbol">{symbol}</span>
      <span className="player-label">{label}</span>
      {active && <span className="player-active-dot" title="Current turn" />}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Board component renders the 3x3 grid.
 */
function Board({ board, onSquareClick, gameOver }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          index={idx}
          onClick={() => onSquareClick(idx)}
          disabled={gameOver || Boolean(value)}
        />
      ))}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Single square of the board.
 */
function Square({ value, index, onClick, disabled }) {
  const label = value ? `Cell ${index + 1}, ${value}` : `Cell ${index + 1}, empty`;
  return (
    <button
      type="button"
      className={`square ${value ? `square-${value}` : ''}`}
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      data-testid={`square-${index}`}
    >
      {value}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Describes the winning line in a user-friendly way.
 */
function WinningLineInfo({ line }) {
  if (!line || line.length !== 3) return null;
  const human = line.map((i) => i + 1).join(', ');
  return <small className="winning-line">Winning line: {human}</small>;
}

/**
 * PUBLIC_INTERFACE
 * Utility: Determine if a board has a winner.
 * Returns { winner: 'X' | 'O', line: number[] } or null.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default App;
