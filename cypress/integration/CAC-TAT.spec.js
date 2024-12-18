/// <reference types="Cypress" />

describe ('Central de atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('verifica o titulo da aplicação', function() {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('input[id="firstName"]').type('John').should('have.value', 'John');
    cy.get('input[id="lastName"]').type('Doe').should('have.value', 'Doe');
    cy.get('input[id="email"]').type('johndoe@gmail.com').should('have.value', 'johndoe@gmail.com');
    cy.get('input[id="phone"]').type('41912341234').should('have.value', '41912341234');
    cy.get('textarea[id="open-text-area"]').type('Ótimo atendimento').should('have.value', 'Ótimo atendimento');
    cy.contains('Enviar').click();
    cy.get('input[id="firstName"]').should('have.value', '');
    cy.get('input[id="lastName"]').should('have.value', '');
    cy.get('input[id="email"]').should('have.value', '');
    cy.get('input[id="phone"]').should('have.value', '');
    cy.get('textarea[id="open-text-area"]').should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('input[id="firstName"]').type('John').should('have.value', 'John');
    cy.get('input[id="lastName"]').type('Doe').should('have.value', 'Doe');
    cy.get('input[id="email"]').type('johndoegmail.com').should('have.value', 'johndoegmail.com');
    cy.get('input[id="phone"]').type('41912341234').should('have.value', '41912341234');
    cy.get('textarea[id="open-text-area"]').type('Ótimo atendimento').should('have.value', 'Ótimo atendimento');
    cy.contains('Enviar').click();
    cy.get('span.error').should('be.visible');
    cy.get('span.error strong').should('contain', 'Valide os campos obrigatórios!');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('input[id="firstName"]').type('John').should('have.value', 'John');
    cy.get('input[id="lastName"]').type('Doe').should('have.value', 'Doe');
    cy.get('input[id="email"]').type('johndoe@gmail.com').should('have.value', 'johndoe@gmail.com');
    cy.get('textarea[id="open-text-area"]').type('Ótimo atendimento').should('have.value', 'Ótimo atendimento');
    cy.get('input[id="phone-checkbox"]').check();
    cy.contains('Enviar').click();
    cy.get('span.error').should('be.visible');
    cy.get('span.error strong').should('contain', 'Valide os campos obrigatórios!');
  });

  it ('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('input[id="firstName"]').type('John').should('have.value', 'John').clear().should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('Enviar').click();
    cy.get('span.error').should('be.visible');
    cy.get('span.error strong').should('contain', 'Valide os campos obrigatórios!');
  });

  it ('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit();
  });
});