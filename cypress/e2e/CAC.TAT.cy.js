describe('CENTRAL DE ATENDIMENTO AO CLIENTE TAT', () => {

  beforeEach(() => {
    cy.visit('src/index.html');

  });

  it('verifica o titulo da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get("#firstName")
      .type("João");
    cy.get('#lastName').type('Silva', { delay: 100 });
    cy.get('#email').type("fake@email.com");
    cy.get('#open-text-area').type("Mensagem de teste");
    cy.get('button[type="submit"]').click();
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.');
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get("#firstName")
      .type("João");
    cy.get('#lastName').type('Silva', { delay: 100 });
    cy.get('#email').type("123");
    //cy.get('#phone').type("11999999999");
    cy.get('#open-text-area').type("Mensagem de teste");
    cy.get('button[type="submit"]').click();
    cy.get('.error ').should('be.visible').and('contain', 'Valide os campos obrigatórios!');
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get("#firstName")
      .type("João");
    cy.get('#lastName').type('Silva', { delay: 100 });
    cy.get('#email').type("fake@email.com");
    cy.get('#phone-checkbox').check();
    cy.get('#open-text-area').type("Mensagem de teste");
    cy.get('button[type="submit"]').click();
    cy.get('.error ').should('be.visible').and('contain', 'Valide os campos obrigatórios!');
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get("#firstName")
      .type("João").should('have.value', 'João');
    cy.get("#firstName").clear().should('have.value', '');
    cy.get('#lastName').type('Silva', { delay: 100 }).should('have.value', 'Silva');
    cy.get('#lastName').clear().should('have.value', '');
    cy.get('#email').type("fake@email.com").should('have.value', 'fake@email.com');
    cy.get('#email').clear().should('have.value', '');
    cy.get('#phone').type("11999999999").should('have.value', '11999999999');
    cy.get('#phone').clear().should('have.value', '')
    cy.get('#open-text-area').type("Mensagem de teste");
    cy.get('button[type="submit"]').click();
    cy.get('.error ').should('be.visible').and('contain', 'Valide os campos obrigatórios!');
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.get('button[type="submit"]').click();
    cy.get('.error ').should('be.visible').and('contain', 'Valide os campos obrigatórios!');
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.');
  })

  it('envia formulario utiliando contains no button', () => {

    cy.contains('button', "Enviar").click();
    cy.get('.error ').should('be.visible').and('contain', 'Valide os campos obrigatórios!');
  })


  it('seleciona um produto (YouTube) por seu texto', () => {

    cy.get('select')
      .select('YouTube')
      .should('have.value', 'youtube')

  })
  it('seleciona um produto (Mentoria) por seu valor', () => {

    cy.get('select')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })
  it('seleciona um produto (Blog) por seu índice', () => {

    cy.get('select').select(1)
      .should('have.value', 'blog')

  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"]').check('feedback')
      .should('be.checked')

  })

  it('marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]')
      .should('have.length', 3)
      .each((radio) => {
        cy.wrap(radio).check().should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked')
      .last()
      .uncheck().should('not.be.checked')

  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type=file]').selectFile('cypress/fixtures/example.json')
      .should((input) => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
})