import { compareStyles, compareValues } from "./utils";

describe('Тестирование алгоритма: "Стек"', () => {
  beforeEach(() => {
    cy.visit("#/stack");
  });

  it("Кнопка должна быть заблокированна при пустом input", () => {
    cy.get("input").should("be.empty");
    cy.get("button[type=submit]").should("be.disabled");
    cy.get("input").type("123456");
    cy.get("button[type=submit]").should("not.be.disabled");
    cy.get("input").clear();
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("Добавление в стек", () => {
    cy.get("input").type("1");
    cy.get("button[type=submit]").click();
    compareValues(["1"]);
    compareStyles(["changing"]);
    compareStyles(["default"]);
    cy.get("[data-testid='testedCircle']").last().contains("top");

    cy.get("input").type("2");
    cy.get("button[type=submit]").click();
    compareValues(["1", "2"]);
    compareStyles(["default", "changing"]);
    compareStyles(["default", "default"]);
    cy.get("[data-testid='testedCircle']").last().contains("top");
  });

  it("Удаление из стека", () => {
    cy.get("input").type("1");
    cy.get("button[type=submit]").contains("Добавить").click();
    compareStyles(["default"]);
    cy.get("button[type=button]").contains("Удалить").click();
    cy.get("[data-testid='testedCircleColor']").should("have.length", 0);
  });

  it("Очистка стека", () => {
    cy.get("input").type("1");
    cy.get("button[type=submit]").contains("Добавить").click();
    cy.get("input").type("2");
    cy.get("button[type=submit]").contains("Добавить").click();
    compareStyles(["default", "default"]);
    cy.get("button[type=reset]").contains("Очистить").click();
    cy.get("[data-testid='testedCircleColor']").should("have.length", 0);
  });
});
