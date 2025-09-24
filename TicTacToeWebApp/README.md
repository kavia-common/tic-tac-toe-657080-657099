# Tic Tac Toe Web App (React)

A lightweight, modern React SPA implementing a classic two-player Tic Tac Toe game. Fully client-side with responsive UI, win/draw detection, reset, and Cypress test scaffolding.

## Features

- Interactive 3x3 board with accessible buttons
- Turn management with clear player indicators
- Win and draw detection, with a summary and winning line info
- Reset button to start a new game
- Responsive design and theme toggle (light/dark)
- Jest + React Testing Library unit tests
- Cypress end-to-end tests scaffolding

## Getting Started

In the project directory, you can run:

### `npm start`
Runs the app in development mode.  
Open http://localhost:3000 to view it in your browser.

### `npm test`
Launches the unit test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## End-to-End Tests (Cypress)

This project includes Cypress for UI and functional testing.

- `npm run cypress:open` – Open Cypress Test Runner (ensure the dev server is running with `npm start`)
- `npm run cypress:run` – Run Cypress tests in headless mode (ensure the dev server is running)
- `npm run e2e` – Starts the dev server and runs Cypress tests automatically via `start-server-and-test`

Cypress config is in `cypress.config.js` and test specs are in `cypress/e2e/`.

## Notes

- This app is entirely client-side; no backend or external APIs.
- Styles are in `src/App.css`; adjust CSS variables or classes to customize the look and feel.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
