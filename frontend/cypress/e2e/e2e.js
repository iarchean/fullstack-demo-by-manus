// Support file for Cypress tests
import '@testing-library/cypress/add-commands';

// Add any custom commands here
Cypress.Commands.add('login', (email, password) => {
  // TODO: Implement login functionality when authentication is added
  cy.log('Login functionality not implemented yet');
});

// Disable uncaught exception handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
