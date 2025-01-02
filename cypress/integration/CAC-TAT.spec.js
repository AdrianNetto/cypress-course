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

  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('select').select('YouTube').should('have.value', 'youtube');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('select').select('mentoria').should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('select').select(1).should('have.value', 'blog');
  });

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"]').check('feedback').should('be.checked');
  });

  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]').each(($radio) => {
      cy.wrap($radio).check().should('be.checked');
    })
  });

  it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]').check().should('be.checked');
    cy.get('input[id="phone-checkbox"]').uncheck().should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json').should(($input) => {
      expect($input[0].files[0].name).to.eq('example.json');
    });
  });

  it('seleciona um arquivo simulando drag-and-drop', function () {
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json', { action: "drag-drop" }).should(($input) => {
      expect($input[0].files[0].name).to.eq('example.json');
    });
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example').as('sampleFile');
    cy.get('input[type="file"]').selectFile('@sampleFile').should(($input) => {
      expect($input[0].files[0].name).to.eq('example');
    });
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('a').should('have.attr', 'target', '_blank');
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('a').invoke('removeAttr', 'target').click();
    cy.contains('Talking About Testing').should('be.visible');
  });

  it('find the cat', function() {
    cy.get('span[id="cat"]').should('be.visible');
  });
});