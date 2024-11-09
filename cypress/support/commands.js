import { faker } from '@faker-js/faker' 
Cypress.Commands.add('registrar',(nomeUsuario)=>{
    const fakeEmailComplement = faker.person.lastName()
    cy.get('[data-qa="signup-name"]').type(nomeUsuario)
    cy.get('[data-qa="signup-email"]').type(`tester-${fakeEmailComplement}@mail.com`)
    cy.get('[data-qa="signup-button"]').click()
    cy.get('#id_gender1').check()
    cy.get('[data-qa="password"]').type('coxinha123', {log: false})
    cy.get('[data-qa="days"]').select('15')
    cy.get('[data-qa="months"]').select('November')
    cy.get('[data-qa="years"]').select('1997')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').type('Faustao')
    cy.get('[data-qa="last_name"]').type('Errou')
    cy.get('[data-qa="company"]').type('Globo')
    cy.get('[data-qa="address"]').type('Rua 1, Nº 2')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('State')
    cy.get('[data-qa="city"]').type('City')
    cy.get('[data-qa="zipcode"]').type('123321')
    cy.get('[data-qa="mobile_number"]').type('99887766')
    cy.get('[data-qa="create-account"]').click()
    cy.url().should('includes', 'account_created')
    cy.get('[data-qa="account-created"]').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
})

Cypress.Commands.add('logar',(email, senha)=>{
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha, { log: false });
    cy.get('[data-qa="login-button"]').click();
})