// User CRUD operations E2E tests
describe('User Management System', () => {
  // Test variables
  const testUser = {
    name: 'Test User',
    email: 'test@example.com'
  };
  const updatedUser = {
    name: 'Updated User',
    email: 'updated@example.com'
  };
  let userId;

  beforeEach(() => {
    // Reset API state before each test
    // Note: In a real application, we would reset the database
    // For this test, we'll just make sure we're starting from the user list page
    cy.visit('/');
    cy.wait(500); // Wait for any pending operations
  });

  it('should display the user list page', () => {
    cy.get('.app-header').should('contain', 'User Management System');
    cy.get('.user-list h2').should('contain', 'Users');
  });

  it('should navigate to create user page', () => {
    cy.contains('Add New User').click();
    cy.get('.user-form h2').should('contain', 'Create New User');
    cy.url().should('include', '/create');
  });

  it('should create a new user', () => {
    // Navigate to create user page
    cy.contains('Add New User').click();
    
    // Fill the form
    cy.get('#name').type(testUser.name);
    cy.get('#email').type(testUser.email);
    
    // Submit the form
    cy.contains('Create User').click();
    
    // Verify success message
    cy.get('.success-message').should('contain', 'User created successfully');
    
    // Return to user list
    cy.contains('Cancel').click();
    
    // Verify user appears in the list
    cy.get('table').should('contain', testUser.name);
    cy.get('table').should('contain', testUser.email);
    
    // Store the user ID for later tests
    cy.get('table tr').contains(testUser.name)
      .parent('tr')
      .find('td:first')
      .invoke('text')
      .then((text) => {
        userId = text;
      });
  });

  it('should navigate to edit user page', () => {
    // Find the user and click edit
    cy.get('table tr').contains(testUser.name)
      .parent('tr')
      .contains('Edit')
      .click();
    
    // Verify we're on the edit page
    cy.get('.user-form h2').should('contain', 'Edit User');
    cy.url().should('include', '/edit/');
    
    // Verify form is populated with user data
    cy.get('#name').should('have.value', testUser.name);
    cy.get('#email').should('have.value', testUser.email);
  });

  it('should update a user', () => {
    // Find the user and click edit
    cy.get('table tr').contains(testUser.name)
      .parent('tr')
      .contains('Edit')
      .click();
    
    // Update the form
    cy.get('#name').clear().type(updatedUser.name);
    cy.get('#email').clear().type(updatedUser.email);
    
    // Submit the form
    cy.contains('Save Changes').click();
    
    // Verify success message
    cy.get('.success-message').should('contain', 'User updated successfully');
    
    // Return to user list
    cy.contains('Cancel').click();
    
    // Verify user is updated in the list
    cy.get('table').should('contain', updatedUser.name);
    cy.get('table').should('contain', updatedUser.email);
  });

  it('should delete a user', () => {
    // Find the user and click delete
    cy.get('table tr').contains(updatedUser.name)
      .parent('tr')
      .contains('Delete')
      .click();
    
    // Confirm deletion in the alert
    cy.on('window:confirm', () => true);
    
    // Verify user is removed from the list
    cy.get('table').should('not.contain', updatedUser.name);
    cy.get('table').should('not.contain', updatedUser.email);
  });

  // TODO: Add more tests for validation, error handling, etc.
});
