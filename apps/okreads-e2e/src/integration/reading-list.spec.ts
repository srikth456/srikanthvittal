describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
 
  it('should display the reading list', () => {
    // Check if items in the reading list are displayed
    cy.get('[data-testing="reading-list-item"]').should('have.length.greaterThan', 0);
  });

  it('should undo the remove action', () => {
    // Click to remove an item
    cy.get('[data-testing="reading-list-item"]').first().within(() => {
      cy.get('[data-testing="remove-button"]').click();
    });

    // Click the Undo action in the snackbar
    cy.get('.mat-snack-bar-container').contains('Undo').click();

    // Verify that the item is back in the reading list
    cy.get('[data-testing="reading-list-item"]').should('have.length.greaterThan', 0);
  });
});
