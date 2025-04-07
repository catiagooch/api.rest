/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

import contrato from '../contracts/produtos.contract'
describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response =>{
      cy.log('Status:', response.status)
      expect(response.status).to.eq(200)
      console.log(response.body)
      return contrato.validateAsync(response.body)
    }) 
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'

    }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('usuarios')
            expect(response.duration).to.be.lessThan(20)

    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    
    const nome = faker.name.findName()
    const email = faker.internet.email()

   cy.request({
    method: 'POST',
    url: 'usuarios',
    body: {
      "nome": nome,
      "email": email,
      "password": "teste",
      "administrador": "true"
    }
   }).then(response => {
    expect(response.status).to.eq(201)
    expect(response.body).to.have.property('nome', nome)
    expect(response.body).to.have.property('email', email)
   })
  })
  });

  it('Deve validar um usuário com email inválido', () => {
    const nome = faker.name.findName();
    const email = "catiavelasco@qa.com.br"

    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
          nome: nome,
          email: email,
          password: "teste",
          administrador: "true"
      },
      failOnStatusCode: false 
  }).then(response => {
      expect(response.status).to.eq(400)
      expect(response.body.message).to.equal('Este email já está sendo usado')
  })

  })

  it('Deve editar um usuário previamente cadastrado', () => {
   let id = "zWP5dXVDkX7aFAK3"
      
      cy.request({
          method: 'PUT', 
          url: `usuarios/${id}`,
          body: {
            "nome": "Catia Velasco Gooch",
            "email": "catiavelasco@qa.com.br",
            "password": "teste",
            "administrador": "true"
          }
      }).should(response => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.equal('Registro alterado com sucesso')
      })
  })

  

  it('Deve deletar um usuário previamente cadastrado', () => {
     let id = "ebCv5SZXVlgoMNZI"
     cy.request({
      method: 'DELETE',
      url: `usuarios/${id}`,
     }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Registro excluído com sucesso')
     })
  })



