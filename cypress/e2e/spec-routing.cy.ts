const mainPageUrl = "http://localhost:3000/#/";

describe("Роутинг страниц приложения", () => {
  //вначале идем на главную
  beforeEach(() => {
    cy.visit("/");
  });
  //эмулируем действия пользователя, кликаем по ссылкам, проверяем что можем вернуться
  it("Переход на страницу алгоритма: 'Cтрока'", () => {
    cy.get('a[href*="#/recursion"]').click();
    cy.contains("Строка");
    cy.get('a[href*="#/"]').click();
    cy.url().should("eq", mainPageUrl);
  });

  it("Переход на страницу алгоритма: 'Последовательность Фибоначчи'", () => {
    cy.get('a[href*="#/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
    cy.get('a[href*="#/"]').click();
    cy.url().should("eq", mainPageUrl);
  });

  it("Переход на страницу алгоритма: 'Сортировка массива'", () => {
    cy.get('a[href*="#/sorting"]').click();
    cy.contains("Сортировка массива");
    cy.get('a[href*="#/"]').click();
    cy.url().should("eq", mainPageUrl);
  });

  it("Переход на страницу алгоритма: 'Стек'", () => {
    cy.get('a[href*="#/stack"]').click();
    cy.contains("Стек");
    cy.get('a[href*="#/"]').click();
    cy.url().should("eq", mainPageUrl);
  });

  it("Переход на страницу алгоритма: 'Очередь'", () => {
    cy.get('a[href*="#/queue"]').click();
    cy.contains("Очередь");
    cy.get('a[href*="#/"]').click();
    cy.url().should("eq", mainPageUrl);
  });

  it("Переход на страницу алгоритма: 'Связный список'", () => {
    cy.get('a[href*="#/list"]').click();
    cy.contains("Связный список");
    cy.get('a[href*="#/"]').click();
    cy.url().should("eq", mainPageUrl);
  });
});
