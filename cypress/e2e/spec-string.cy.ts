import { compareStyles, compareValues } from "./utils";

describe('Тестирование алгоритма: "Строка"', () => {
  beforeEach(() => {
    cy.visit("#/recursion");
  });

  it("Кнопка должна быть заблокированна при пустом input", () => {
    cy.get("input").should("be.empty");
    cy.get("button[type=submit]").should("be.disabled");
    cy.get("input").type("123456");
    cy.get("button[type=submit]").should("not.be.disabled");
    cy.get("input").clear();
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("Отрисовка разворота строки", () => {
    cy.get("input").type("1234");
    cy.get("button[type=submit]").click();

    compareStyles(["changing", "default", "default", "changing"]);
    compareValues(["4", "2", "3", "1"]);

    compareStyles(["modified", "changing", "changing", "modified"]);
    compareValues(["4", "3", "2", "1"]);

    compareStyles(["modified", "modified", "modified", "modified"]);
  });
});
