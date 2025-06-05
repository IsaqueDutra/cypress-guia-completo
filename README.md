**Resumo de Cypress - Guia Completo**

---

## 🌟 Bloco `describe()`

Usado para **organizar** seus testes, agrupando-os por funcionalidade ou página.

Exemplo:
```javascript
describe('CENTRAL DE ATENDIMENTO AO CLIENTE TAT', () => { ... });
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
| `it.only()` / `describe.only()`              | Executa apenas o(s) teste(s) marcado(s) com `.only`.           | `it.only('teste', () => { ... });`                                |
| `it.skip()`                                  | Ignora temporariamente o teste.                                | `it.skip('teste', () => { ... });`                                |
| `Cypress.Commands.add()`                     | Cria comandos personalizados para reaproveitar código.         | `Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { ... });` |

---

## 📻 Trabalhando com elementos do tipo `radio`

### Selecionar um radio específico
```javascript
cy.get('[type="radio"]').check('feedback')
  .should('be.checked');
```

### Validar todos os radios da tela
```javascript
cy.get('[type="radio"]')
  .should('have.length', 3)
  .each((radio) => {
    cy.wrap(radio).check().should('be.checked');
  });
```

> 💡 Só um `radio` pode estar selecionado por vez, mas esse teste garante que todos podem ser clicados corretamente.

---

## ✨ Criar funções personalizadas com `Cypress.Commands.add()`

✅ **Por que criar funções personalizadas?**
- Para **reutilizar código** e deixar os testes mais limpos.
- Ideal para **ações repetitivas** como preencher formulários.

✅ **Como fazer:**

No arquivo `commands.js`:
```javascript
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('João');
  cy.get('#lastName').type('Silva');
  cy.get('#email').type('joao@teste.com');
  cy.get('#open-text-area').type('Mensagem de teste');
  cy.get('button[type="submit"]').click();
});
```

✅ **Como usar no teste:**

No arquivo de teste (`spec.js` ou `ci.js`):
```javascript
it('preenche os campos obrigatórios e envia o formulário', () => {
  cy.fillMandatoryFieldsAndSubmit();
  cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.');
});
```

---

## 💡 Exemplo de uso com `cy.contains()`

```javascript
it.only('envia formulario utilizando Contains no button', () => {
  cy.contains('button', 'Enviar').click();
  cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!');
});
```

---

## 🔽 Exemplo de uso com `select`

### Selecionar por texto:
```javascript
cy.get('#select-plataforma').select('YouTube');
```

### Selecionar por value:
```javascript
cy.get('#select-plataforma').select('youtube');
```

### Selecionar por posição:
```javascript
cy.get('#select-plataforma').select([2]);
```

### Validar valor selecionado:
```javascript
cy.get('#select-plataforma').should('have.value', 'youtube');
```

---

## 💻 Exemplo prático com todos os comandos

```javascript
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
```

✅ **Dicas Finais:**
- Use nomes descritivos nos testes para entender melhor o que está sendo testado.
- Teste com diferentes dados para simular situações reais.
- Use `{ delay: 100 }` para simular uma digitação mais realista.
- Revise os seletores CSS para garantir que está pegando o elemento correto.
- Crie comandos reutilizáveis para manter o código limpo.
- Use `cy.contains()` para facilitar a seleção de elementos com texto visível.
- Use `cy.select()` para trabalhar com campos de seleção (dropdown).
- Use `cy.check()` para lidar com radios e checkboxes de forma precisa.

---

✨ Continue praticando e ajustando seu código no Evernote para transformar em um README.md futuramente!

Bons estudos! 🚀📚
