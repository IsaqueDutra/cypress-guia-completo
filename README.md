# Resumo de Cypress - Guia Completo

## :star: Bloco `describe()`
Usado para **organizar** os testes, agrupando-os por funcionalidade ou página.

```javascript
describe('CENTRAL DE ATENDIMENTO AO CLIENTE', () => { ... });
```

---

## :round_pushpin: `beforeEach()`
Executa **antes de cada teste (`it()`)**. Ideal para abrir a página antes de cada teste começar.

```javascript
beforeEach(() => {
  cy.visit('src/index.html');
});
```

---

## :test_tube: Tabela de Comandos do Cypress usados

| Comando | O que faz | Exemplo |
|--------|------------|---------|
| `cy.visit()` | Abre a página no navegador | `cy.visit('src/index.html');` |
| `cy.title().should()` | Verifica o título da página | `cy.title().should('eq', 'Central de Atendimento...');` |
| `cy.get().type()` | Seleciona campo e digita | `cy.get('#firstName').type('João');` |
| `cy.get().type(valor, { delay: tempo })` | Digita simulando tempo | `cy.get('#lastName').type('Silva', { delay: 100 });` |
| `cy.get().click()` | Clica em botão/elemento | `cy.get('button[type="submit"]').click();` |
| `cy.contains(tag, texto)` | Seleciona pelo texto | `cy.contains('button', 'Enviar').click();` |
| `cy.get().should()` | Verifica condição | `cy.get('.success').should('be.visible');` |
| `.and('contain', texto)` | Complementa verificação | `.and('contain', 'Mensagem enviada com sucesso.');` |
| `it.only()` / `describe.only()` | Executa apenas o marcado | `it.only('teste', () => { ... });` |
| `it.skip()` | Ignora teste | `it.skip('teste', () => { ... });` |
| `Cypress.Commands.add()` | Cria comando personalizado | `Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { ... });` |

---

## :sparkles: Funções personalizadas com `Cypress.Commands.add()`

```javascript
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('João');
  cy.get('#lastName').type('Silva');
  cy.get('#email').type('joao@teste.com');
  cy.get('#open-text-area').type('Mensagem de teste');
  cy.get('button[type="submit"]').click();
});
```

No teste:

```javascript
it('envia o formulário', () => {
  cy.fillMandatoryFieldsAndSubmit();
  cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.');
});
```

---

## :bulb: Exemplo com `cy.contains()`

```javascript
cy.contains('button', 'Enviar').click();
cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!');
```

---

## :computer: Exemplo prático completo

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

---

## :memo: Dicas Finais
- Use nomes descritivos nos testes
- Simule digitação real com `{ delay: 100 }`
- Use `.only` para testes isolados
- Use `.skip` para ignorar testes temporariamente
- Combine `cy.get()` com `cy.contains()` se necessário
- Crie comandos customizados para deixar o código limpo

---

Bons estudos e pratique bastante! 🚀
