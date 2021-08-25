describe('Example Application', () => {
  it('Login and logout roundtrip', () => {
    cy.log('Visiting Home...')
    cy.visit('/')
    cy.log('Checking Login form...')
    cy.get('[data-testid="login-form"]').should('be.visible')
    cy.get('[data-testid="login-form"] input[type=email]')
      .should('be.visible')
      .should('be.enabled')
      .type('testuser@gmail.com')
    cy.get('[data-testid="login-form"] input[type=password]')
      .should('be.visible')
      .should('be.enabled')
      .type('password')
      .blur()
    cy.get('[data-testid="login-form"] button[type=submit]').should('be.visible')
    cy.log('Logging in...')
    cy.get('[data-testid="login-form"] button[type=submit]').click()

    // cy.log('Checking Welcome screen...')
    // cy.get('hello-world div h2').should('be.visible')

    cy.log('Logging out...')
    cy.get('[data-testid="logout-button"]').should('be.visible').click()

    cy.log('Checking Login form...')
    cy.get('[data-testid="login-form"]').should('be.visible')
  })
})
