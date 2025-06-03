Cypress.Commands.add('fillMandatoryFieldsAndSubmit',() => {
     cy.get("#firstName").type("João");
    cy.get('#lastName').type('Silva', { delay: 100 });
    cy.get('#email').type("fake@email.com");
    cy.get('#open-text-area').type("Mensagem de teste");
    cy.get('button[type="submit"]').click();
});