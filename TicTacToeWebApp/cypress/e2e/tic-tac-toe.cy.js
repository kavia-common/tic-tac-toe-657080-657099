describe('Tic Tac Toe App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the app with status and board', () => {
    cy.contains(/Tic Tac Toe/i).should('be.visible');
    cy.get('[data-testid="status-text"]').should('contain.text', 'Next player: X');
    for (let i = 0; i < 9; i++) {
      cy.get(`[data-testid="square-${i}"]`).should('exist');
    }
  });

  it('plays a game and detects a win for X on the top row', () => {
    // X O X / O O X -> then ensure correct win scenario via simple pattern
    cy.get('[data-testid="square-0"]').click(); // X
    cy.get('[data-testid="square-3"]').click(); // O
    cy.get('[data-testid="square-1"]').click(); // X
    cy.get('[data-testid="square-4"]').click(); // O
    cy.get('[data-testid="square-2"]').click(); // X wins

    cy.contains(/Winner: X/i).should('be.visible');
    // Further clicks should be disabled
    cy.get('[data-testid="square-5"]').should('be.disabled');
  });

  it('resets the board', () => {
    cy.get('[data-testid="square-0"]').click(); // X
    cy.get('[data-testid="reset-button"]').click();
    cy.get('[data-testid="status-text"]').should('contain.text', 'Next player: X');
    cy.get('[data-testid="square-0"]').should('not.contain.text', 'X');
  });

  it('theme toggle switches label', () => {
    cy.get('.theme-toggle').then(($btn) => {
      const initialText = $btn.text();
      cy.wrap($btn).click();
      cy.get('.theme-toggle').should(($btn2) => {
        expect($btn2.text()).to.not.eq(initialText);
      });
    });
  });
});
