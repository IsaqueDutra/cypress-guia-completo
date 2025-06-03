# Resumo de Cypress - Guia Completo

## :star: Bloco `describe()`
Usado para **organizar** seus testes por funcionalidade ou página.

```javascript
describe('CENTRAL DE ATENDIMENTO AO CLIENTE TAT', () => { ... });
```

## :round_pushpin: `beforeEach()`
Executa antes de cada teste `it()`.

```javascript
beforeEach(() => {
  cy.visit('src/index.html');
});
```

## :test_tube: Comandos Cypress

| Comando | O que faz | Exemplo |
|--------|-----------|---------|
| `cy.visit()` | Abre a página | `cy.visit('src/index.html');` |
| `cy.title().should()` | Verifica título | `cy.title().should('eq', '...');` |
| `cy.get().type()` | Digita valor | `cy.get('#firstName').type('João');` |
| `cy.get().type(valor, { delay: tempo })` | Digita com delay | `cy.get('#lastName').type('Silva', { delay: 100 });` |
| `cy.get().click()` | Clica | `cy.get('button[type="submit"]').click();` |
| `cy.contains(tag, texto)` | Seleciona por texto | `cy.contains('button', 'Enviar').click();` |
| `cy.get().should()` | Valida elemento | `cy.get('.success').should('be.visible');` |
| `.and('contain', texto)` | Complementa validação | `.and('contain', 'Mensagem enviada com sucesso.');` |
| `cy.get().select(valor)` | Seleciona por texto ou value | `cy.get('#select-plataforma').select('YouTube');` |
| `cy.get().select([índice])` | Seleciona por índice | `cy.get('#select-plataforma').select([2]);` |
| `.should('have.value', valor)` | Valida seleção | `cy.get('#select-plataforma').should('have.value', 'youtube');` |
| `it.only()` / `describe.only()` | Executa apenas aquele teste | `it.only('teste', () => {...});` |
| `it.skip()` | Ignora o teste | `it.skip('teste', () => {...});` |
| `Cypress.Commands.add()` | Cria comando customizado | `Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {...});` |

## :sparkles: Função personalizada

```javascript
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('João');
  cy.get('#lastName').type('Silva');
  cy.get('#email').type('joao@teste.com');
  cy.get('#open-text-area').type('Mensagem de teste');
  cy.get('button[type="submit"]').click();
});
```

## :bulb: `cy.contains()`

```javascript
cy.contains('button', 'Enviar').click();
cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!');
```

## :arrow_down: `select`

```javascript
// Por texto
cy.get('#select-plataforma').select('YouTube');

// Por value
cy.get('#select-plataforma').select('youtube');

// Por posição
cy.get('#select-plataforma').select([2]);

// Validar valor selecionado
cy.get('#select-plataforma').should('have.value', 'youtube');
```

## :computer: Exemplo prático

```javascript
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

  it.only('envia o formulário', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.');
  });

  it.skip('verifica o título', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });
});
```

## :bookmark_tabs: Dicas
- Use nomes claros nos testes
- Simule digitação com `delay`
- Use `.only` para testar isoladamente
- Use `.skip` para ignorar testes
- Crie comandos reutilizáveis

---
