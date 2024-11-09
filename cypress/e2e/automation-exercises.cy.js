import { faker } from '@faker-js/faker' 

describe('Automation Exercise', () => {
  const nomeUsuario = faker.person.firstName()
    beforeEach(() => {
        cy.visit('/')
      })

    it('TC 01: Cadastrar um usuário', () => {
        cy.contains('Signup').click()
        cy.registrar(nomeUsuario)
        cy.contains('b',nomeUsuario)
    })


    it('TC 02: Logar com email e senha corretos', () => {
        cy.contains('Signup').click()
        cy.logar('arthurlandim@email.com','Coxinha123')
        cy.contains('b','Arthur Landim')
    })

    it('TC 03: Logar com email e senha incorretos', () => {
        cy.contains('Signup').click();
        cy.logar('arthurlandim@email.com','Pizza123')
        cy.contains('p', 'Your email or password is incorrect!');
    })

    it('TC 04: Deslogar após Logar', () => {
        cy.contains('Signup').click();
        cy.logar('arthurlandim@email.com','Coxinha123')
        cy.contains('b','Arthur Landim')
        cy.contains('Logout').click()
        cy.contains("Login to your account").should("be.visible")
        cy.url().should('contain', 'login')
    })

    it('TC 05: Registrar com email ja cadastrado', () => {
        cy.contains('Signup').click()
        cy.get('[data-qa="signup-name"]').type(nomeUsuario)
        cy.get('[data-qa="signup-email"]').type('arthurlandim@email.com')
        cy.get('[data-qa="signup-button"]').click()
        cy.contains('p', 'Email Address already exist!').should('be.visible')
      })

      it('TC 06: Formulario de contate-nos', () => {
        cy.contains('Contact us').click()
        cy.contains('h2','Get In Touch').should('be.visible')
        cy.get('[data-qa="name"]').type(`Arthur Landim`)
        cy.get('[data-qa="email"]').type(`arthurlandim@email.com`)
        cy.get('[data-qa="subject"]').type(`Test Automation`)
        cy.get('[data-qa="message"]').type(`Learning Test Automation`)
        cy.fixture('example.json').as('arquivo')
        cy.get('input[name="upload_file"]').selectFile('@arquivo')
        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('be.visible').should('have.text', 'Success! Your details have been submitted successfully.')
        cy.contains('Home').click()
        cy.url().should('equal','https://automationexercise.com/')
      })

      it('TC 08: Valida todos os produtos e pagina de detalhes', () => {
        cy.contains('Products').click()
        cy.url().should('contain', 'products')
        cy.contains('h2', 'All Products')
        cy.get('.single-products')
          .should('be.visible')
          .and('have.length.at.least', 1)
          .first()
          .parent()
          .contains('View Product')
          .click()
        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information p').should('be.visible').and('have.length', 4)
        cy.get('.product-information span span').should('be.visible')
      })

      it('TC 09: Procurar produto', () => {
        cy.contains('Products').click()
        cy.url().should('contain', 'products')
        cy.contains('h2', 'All Products')
        cy.get('#search_product').type('Dress')
        cy.get('#submit_search').click()
        cy.contains('h2', 'Searched Products')
        cy.get('.single-products')
          .should('be.visible')
          .and('have.length.at.least', 1)
      });

      it('TC 10: Verificar inscrição na página inicial', () => {
        cy.get('#susbscribe_email')
          .scrollIntoView()
          .type('arthurlandim@email.com')
        cy.get('#subscribe').click()
        cy.contains('You have been successfully subscribed!').should('be.visible')
      });

      it('TC 15: Comprar: registrar antes de confirmar', () => {
        cy.contains('Login').click()
        cy.registrar('usuario2')
        cy.contains('b', 'usuario2')
        cy.contains("Add to cart").click()
        cy.contains("View Cart").click()
        cy.get('.btn-default.check_out').should('be.visible')
        cy.get('.btn-default.check_out').click()
        cy.get('.heading').first().should('have.text', 'Address Details')
        cy.get('.heading').last().should('have.text', 'Review Your Order')
        cy.get('.form-control').type('comentario teste')
        cy.get('.btn-default.check_out').click()
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type(8)
        cy.get('[data-qa="expiry-year"]').type(2038)
        cy.get('[data-qa="pay-button"]').click()
        cy.get('[data-qa="order-placed"]').should('be.visible')
        cy.get('[href *="delete"]').click()
        cy.contains('b', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
      });
})