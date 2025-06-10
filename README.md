# Resumo de Cypress - Guia Completo

## :star: Bloco `describe()`
Organiza os testes agrupando por funcionalidades.

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
| `cy.get().type(valor, { delay })` | Digita com atraso | `cy.get('#lastName').type('Silva', { delay: 100 });` |
| `cy.get().click()` | Clica | `cy.get('button[type="submit"]').click();` |
| `cy.contains(tag, texto)` | Seleciona por texto | `cy.contains('button', 'Enviar').click();` |
| `cy.get().should()` | Valida elemento | `cy.get('.success').should('be.visible');` |
| `.and('contain', texto)` | Complementa validação | `.and('contain', 'Mensagem enviada com sucesso.');` |
| `cy.get().select(valor)` | Seleciona option por texto ou value | `cy.get('#select-plataforma').select('YouTube');` |
| `cy.get().select([índice])` | Seleciona option por posição | `cy.get('#select-plataforma').select([2]);` |
| `.should('have.value', valor)` | Valida valor selecionado | `cy.get('#select-plataforma').should('have.value', 'youtube');` |
| `cy.get().check()` | Marca radio/checkbox | `cy.get('[type="radio"]').check('feedback');` |
| `cy.wrap().check()` | Marca individualmente | `cy.wrap(radio).check().should('be.checked');` |
| `cy.get().uncheck()` | Desmarca checkbox | `cy.get('input[type="checkbox"]').last().uncheck();` |
| `cy.get().selectFile()` | Seleciona arquivo | `cy.get('input[type=file]').selectFile('cypress/fixtures/example.json');` |
| `.invoke('removeAttr')` | Remove atributo | `cy.get('a').invoke('removeAttr', 'target');` |
| `it.only()` / `describe.only()` | Executa somente esse teste | `it.only('teste', () => {...});` |
| `it.skip()` | Ignora o teste | `it.skip('teste', () => {...});` |
| `Cypress.Commands.add()` | Cria comando customizado | `Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {...});` |

## :sparkles: Comando personalizado

```javascript
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('João');
  cy.get('#lastName').type('Silva');
  cy.get('#email').type('joao@teste.com');
  cy.get('#open-text-area').type('Mensagem de teste');
  cy.get('button[type="submit"]').click();
});
```

## :bulb: `.contains()`

```javascript
cy.contains('button', 'Enviar').click();
cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!');
```

## :arrow_down: Campos `select`

```javascript
cy.get('#select-plataforma').select('YouTube');
cy.get('#select-plataforma').select('youtube');
cy.get('#select-plataforma').select([2]);
cy.get('#select-plataforma').should('have.value', 'youtube');
```

## :radio_button: Campos `radio`

```javascript
cy.get('[type="radio"]').check('feedback')
  .should('be.checked');

cy.get('[type="radio"]').should('have.length', 3)
  .each((radio) => {
    cy.wrap(radio).check().should('be.checked');
  });
```

## :white_check_mark: Campos `checkbox`

```javascript
cy.get('input[type="checkbox"]').check().should('be.checked')
  .last().uncheck().should('not.be.checked');
```

## :paperclip: Seleção de arquivos

```javascript
cy.get('input[type=file]')
  .selectFile('cypress/fixtures/example.json')
  .should((input) => {
    expect(input[0].files[0].name).to.equal('example.json');
  });
```

## :globe_with_meridians: Testando links com target="_blank"

### Verifica se o link abre em nova aba

```javascript
cy.get('#privacy a')
  .should('have.attr', 'target', '_blank');
```

### Remove o target e valida redirecionamento

```javascript
cy.get('#privacy a')
  .invoke('removeAttr', 'target')
  .click();

cy.get('title')
  .should('contain', 'CAC TAT - Política de Privacidade');
```

## :computer: Exemplo prático

```javascript
describe('CENTRAL DE ATENDIMENTO AO CLIENTE TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html');
  });

  it('preenche e envia', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.');
  });
});
```

## :bookmark_tabs: Dicas

- Use nomes descritivos nos testes
- Simule digitação com `delay`
- Use `.only` para testes isolados
- Use `.skip` para ignorar testes
- Crie comandos reutilizáveis
- Use `selectFile()` para upload
- Teste interações de `radio` e `checkbox`
- Use `.invoke('removeAttr')` para testar links externos

---
Bons Estudos!!!

