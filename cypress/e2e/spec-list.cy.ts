import { compareStyles, compareValues, compareHeads, compareTails } from "./utils";
const MODIFYED = "modified";
const CHANGING = "changing";
const DEFAULT = "default";

describe('Тестирование алгоритма: "Связанный список"', () => {
  beforeEach(() => {
    cy.visit("#/list");
  });

  it("Кнопки должны быть заблокированна при пустом input", () => {
    cy.get("input").first().should("be.empty");
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");
    cy.get("input").first().type("1234");
    cy.contains("button[type=button]", "Добавить в head").should("not.be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("not.be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");
    cy.get("input").first().clear();
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");

    cy.get("input").eq(1).should("be.empty");
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");
    cy.get("input").eq(1).type("2");
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("not.be.disabled");
    cy.get("input").eq(1).clear();
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");

    cy.get("input").first().should("be.empty");
    cy.get("input").eq(1).should("be.empty");
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");
    cy.get("input").first().type("1234");
    cy.get("input").eq(1).type("2");
    cy.contains("button[type=button]", "Добавить в head").should("not.be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("not.be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("not.be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("not.be.disabled");
    cy.get("input").first().clear();
    cy.get("input").eq(1).clear();
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");
  });
});
