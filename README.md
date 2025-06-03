# 📘 Cypress - Guia Completo

Este repositório é um **guia completo** para quem deseja aprender Cypress, com exemplos práticos, explicações detalhadas e boas práticas para testes automatizados de front-end.

---

## 🌟 Bloco `describe()`

Utilizado para **organizar** seus testes, agrupando-os por funcionalidade ou página.

```javascript
describe('CENTRAL DE ATENDIMENTO AO CLIENTE TAT', () => {
  // testes aqui
});

📍 beforeEach()
Executa antes de cada teste (it()). Ideal para abrir a página antes de cada teste começar.

beforeEach(() => {
  cy.visit('src/index.html');
});


🧪 Tabela de Comandos do Cypress Usados

| Comando                                         | Descrição                                              | Exemplo                                                                |
| ----------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| `cy.visit()`                                    | Abre a página no navegador.                            | `cy.visit('src/index.html');`                                          |
| `cy.title().should()`                           | Verifica o título da página.                           | `cy.title().should('eq', 'Central de Atendimento...');`                |
| `cy.get(seletor).type()`                        | Seleciona um campo e digita algo.                      | `cy.get('#firstName').type('João');`                                   |
| `cy.get(seletor).type(valor, { delay: tempo })` | Digita simulando um tempo de digitação.                | `cy.get('#lastName').type('Silva', { delay: 100 });`                   |
| `cy.get(seletor).click()`                       | Clica em um botão ou elemento.                         | `cy.get('button[type="submit"]').click();`                             |
| `cy.get(seletor).should()`                      | Verifica se o elemento cumpre alguma condição.         | `cy.get('.success').should('be.visible');`                             |
| `.and('contain', texto)`                        | Complementa a verificação com o conteúdo esperado.     | `.and('contain', 'Mensagem enviada com sucesso.');`                    |
| `it.only()` / `describe.only()`                 | Executa apenas o(s) teste(s) marcado(s) com `.only`.   | `it.only('teste', () => { ... });`                                     |
| `it.skip()`                                     | Ignora temporariamente o teste.                        | `it.skip('teste', () => { ... });`                                     |
| `Cypress.Commands.add()`                        | Cria comandos personalizados para reaproveitar código. | `Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { ... });` |

✨ Criar Funções Personalizadas com Cypress.Commands.add()
✅ Por que criar funções personalizadas?
Reutilização de código: mantém os testes mais limpos e organizados.

Ideal para ações repetitivas: como preencher formulários.

✅ Como fazer:
No arquivo commands.js:

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('João');
  cy.get('#lastName').type('Silva');
  cy.get('#email').type('joao@teste.com');
  cy.get('#open-text-area').type('Mensagem de teste');
  cy.get('button[type="submit"]').click();
});

✅ Como usar no teste:
No arquivo de teste (spec.js ou ci.js):

// Definindo um comando customizado no commands.js
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('João');
  cy.get('#lastName').type('Silva', { delay: 100 });
  cy.get('#email').type('joao@teste.com');
  cy.get('#open-text-area').type('Mensagem de teste');
  cy.get('button[type="submit"]').click();
});

describe('CENTRAL DE ATENDIMENTO AO CLIENTE TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html');
  });

  it.only('preenche os campos obrigatórios e envia o formulário', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.');
  });

  it.skip('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });
});

💻 Exemplo Prático com Todos os Comandos

// Definindo um comando customizado no commands.js
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('João');
  cy.get('#lastName').type('Silva', { delay: 100 });
  cy.get('#email').type('joao@teste.com');
  cy.get('#open-text-area').type('Mensagem de teste');
  cy.get('button[type="submit"]').click();
});

describe('CENTRAL DE ATENDIMENTO AO CLIENTE TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html');
  });

  it.only('preenche os campos obrigatórios e envia o formulário', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.');
  });

  it.skip('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });
});



