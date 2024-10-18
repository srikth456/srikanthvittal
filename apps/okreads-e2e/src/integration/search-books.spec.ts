describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should see search results as I am typing', () => {
    // TODO: Implement this test!
    const searchTerm = 'javascript';
    cy.get('input[type="search"]').as('searchInput');
    [...searchTerm].forEach((char) => {
      cy.get('@searchInput').type(char);
      cy.wait(500); // Wait for debounce time
      cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 0);
    });

    cy.get('@searchInput').clear();
    cy.get('[data-testing="book-item"]').should('have.length', 0);
  });
});
