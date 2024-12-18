Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('input[id="firstName"]').type('John');
  cy.get('input[id="lastName"]').type('Doe');
  cy.get('input[id="email"]').type('johndoe@gmail.com');
  cy.get('textarea[id="open-text-area"]').type('Ótimo atendimento').should('have.value', 'Ótimo atendimento');

  cy.contains('Enviar').click();

  cy.get('span.success').should('be.visible');
  cy.get('span.success strong').should('contain', 'Mensagem enviada com sucesso.');
})