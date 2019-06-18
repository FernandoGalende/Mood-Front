const url = 'http://localhost:4200';
const navigateTo = () => cy.visit(url);
const getGreeting = () => cy.get('app-root h1');

describe('Login component', () => {
  beforeEach(navigateTo);

  it('Should visit login page', () => {
    cy.get('.submit-message').contains('Login');
  });

  it('Should have two input fields', () => {
    cy.get('input').should('have.length', 2);
  });

  it('Form should be invalid on load', () => {
    cy.get('button')
      .should('have.class', 'submit-button')
      .get('button')
      .should('have.attr', 'disabled');
  });

  it('Form should be valid after entering inputs', () => {
    cy.get('input[type="text"]')
      .type('test@user.com')
      .get('input[type="password"]')
      .type('Holita que tal');
    cy.get('button')
      .should('have.class', 'ready')
      .get('button')
      .should('not.have.class', 'disabled');
  });

  it('Should not show error on load', () => {
    cy.get('.error').should('not.exist');
  });
});
