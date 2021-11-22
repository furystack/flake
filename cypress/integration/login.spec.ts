describe('Login and logout', () => {
  it('Login and logout roundtrip', () => {
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

    cy.get('[data-testid="login-form"] button[type=submit]').should('be.visible').scrollIntoView().click()

    // Assert dashboard content

    cy.get('[data-testid="logout-button"]').should('be.visible').click()

    cy.log('Checking Login form...')
    cy.get('[data-testid="login-form"]').should('be.visible')
  })

  it('Should warn for missing / wrong email', () => {
    cy.visit('/')
    cy.get('[data-testid="login-form"] button[type=submit]').click()
    //assert error message
    cy.get('[data-testid="login-form"] input[type=email]').type('wronguser')
    //assert error message
    cy.get('[data-testid="login-form"] button[type=submit]').click()
    cy.get('[data-testid="login-form"] input[type=email]').type('user@email.com')
    cy.get('[data-testid="login-form"] button[type=submit]').click()
    //assert error message gone
  })

  it('Should warn for wrong username / password', () => {
    cy.visit('/')
    cy.get('[data-testid="login-form"] input[type=email]').type('wronguser@gmail.com')
    cy.get('[data-testid="login-form"] input[type=password]').type('wrongpassword').blur()
    cy.get('[data-testid="login-form"] button[type=submit]').click()
  })
})
