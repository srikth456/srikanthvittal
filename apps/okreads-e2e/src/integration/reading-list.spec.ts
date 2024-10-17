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
  it('Should set book as finished when user click on finish', () => {
    cy.get('input[type="search"]').type('sri');
    cy.get('button[aria-label^="Want to Read"]').eq(0).click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    
    cy.get('.reading-list-content')
      .find('.reading-list-item')
      .then(($elements) => {
        cy.wrap($elements[$elements.length - 1])
          .find("title^='Mark as finish']")
          .click();
      });
    cy.get('.reading-list-content')
      .find('.reading-list-item')
      .then(($elements) => {
        cy.wrap($elements[$elements.length - 1]).should('contain', 'Finished');
      });
    cy.get('.reading-list-content')
      .find('.reading-list-item')
      .then(($elements) => {
        cy.wrap($elements[$elements.length - 1]).should(
          'Finished Date'
        );
      });
      cy.get('.reading-list-content').find('.reading-list-item').then($elements => {
        cy.wrap($elements[$elements.length-1]).find("[title^='Remove']")
        .click()
      })
  });

});
