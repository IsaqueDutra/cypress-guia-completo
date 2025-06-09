**Resumo de Cypress - Guia Completo**

---

## 🌟 Bloco `describe()`

Usado para **organizar** seus testes, agrupando-os por funcionalidade ou página.

Exemplo:
```javascript
describe('CENTRAL DE ATENTIMENTO AO CLIENTE TAT', () => { ... });
```

---

## 📍 `beforeEach()`

Executa **antes de cada teste (`it()`)**. Ideal para abrir a página antes de cada teste começar.

Exemplo:
```javascript
beforeEach(() => {
  cy.visit('src/index.html');
});
```

---

## 🧪 Tabela de Comandos do Cypress usados

| Comando                                      | O que faz                                                      | Exemplo                                                          |
| ------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| `cy.visit()`                                 | Abre a página no navegador.                                    | `cy.visit('src/index.html');`                                     |
| `cy.title().should()`                        | Verifica o título da página.                                   | `cy.title().should('eq', 'Central de Atendimento...');`           |
| `cy.get(seletor).type()`                     | Seleciona um campo e digita algo.                              | `cy.get('#firstName').type('João');`                              |
| `cy.get(seletor).type(valor, { delay: tempo })` | Digita simulando um tempo de digitação.                     | `cy.get('#lastName').type('Silva', { delay: 100 });`              |
| `cy.get(seletor).click()`                    | Clica em um botão ou elemento.                                 | `cy.get('button[type="submit"]').click();`                      |
| `cy.contains(tag, texto)`                    | Seleciona um elemento baseado no texto que ele contém.        | `cy.contains('button', 'Enviar').click();`                        |
| `cy.get(seletor).should()`                   | Verifica se o elemento cumpre alguma condição.                 | `cy.get('.success').should('be.visible');`                        |
| `.and('contain', texto)`                     | Complementa a verificação com o conteúdo esperado.             | `.and('contain', 'Mensagem enviada com sucesso.');`               |
| `cy.get().select(valor)`                     | Seleciona uma opção em um campo do tipo `select`.              | `cy.get('#select-plataforma').select('YouTube');`                 |
| `cy.get().select([índice])`                  | Seleciona a opção de acordo com a posição.                     | `cy.get('#select-plataforma').select([2]);`                       |
| `.should('have.value', valor)`               | Valida se o valor foi corretamente selecionado.                | `cy.get('#select-plataforma').should('have.value', 'youtube');`   |
| `cy.get().check(valor)`                      | Marca um `radio` ou `checkbox` pelo valor.                     | `cy.get('[type="radio"]').check('feedback');`                   |
| `cy.wrap().check()`                          | Marca elementos individualmente, útil com `.each()`.           | `cy.wrap(radio).check().should('be.checked');`                    |
| `cy.get().uncheck()`                         | Desmarca um checkbox.                                          | `cy.get('input[type="checkbox"]').last().uncheck();`            |
| `cy.get().selectFile()`                      | Seleciona um arquivo para upload.                              | `cy.get('input[type=file]').selectFile('cypress/fixtures/example.json');` |
| `.invoke('removeAttr')`                      | Remove atributo de um elemento.                                | `cy.get('a').invoke('removeAttr', 'target');`                     |
| `it.only()` / `describe.only()`              | Executa apenas o(s) teste(s) marcado(s) com `.only`.           | `it.only('teste', () => { ... });`                                |
| `it.skip()`                                  | Ignora temporariamente o teste.                                | `it.skip('teste', () => { ... });`                                |
| `Cypress.Commands.add()`                     | Cria comandos personalizados para reaproveitar código.         | `Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { ... });` |

---

## 🌐 Testando links com `target="_blank"`

### Verificar se o link abre em nova aba:
```javascript
cy.get('#privacy a')
  .should('have.attr', 'target', '_blank');
```

### Remover o `target` e testar o redirecionamento:
```javascript
cy.get('#privacy a')
  .invoke('removeAttr', 'target')
  .click();

cy.get('title')
  .should('contain', 'CAC TAT - Política de Privacidade');
```

> 🔍 Dica: Cypress não interage com múltiplas abas, por isso removemos o `target` para validar o redirecionamento.

---

✨ Continue praticando e ajustando seu código no Evernote para transformar em um README.md futuramente!

Bons estudos! 🚀📚
