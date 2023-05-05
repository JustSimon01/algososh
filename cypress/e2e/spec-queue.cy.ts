import { compareStyles, compareValues, compareHeads, compareTails } from "./utils";
const MODIFYED = "modified";
const CHANGING = "changing";
const DEFAULT = "default";

describe('Тестирование алгоритма: "Очередь"', () => {
  beforeEach(() => {
    cy.visit("#/queue");
  });

  it("Кнопка должна быть заблокированна при пустом input", () => {
    cy.get("input").should("be.empty");
    cy.get("button[type=submit]").should("be.disabled");
    cy.get("input").type("1234");
    cy.get("button[type=submit]").should("not.be.disabled");
    cy.get("input").clear();
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("Добавление в очередь", () => {
    cy.get("input").type("1111");
    cy.get("button[type=submit]").click();
    compareStyles([CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    compareHeads(["head", "", "", "", "", "", ""]);
    compareValues(["1111", "", "", "", "", "", ""]);
    compareTails(["tail", "", "", "", "", "", ""]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
  });

  it("Удаление из очереди", () => {
    cy.get("input").type("1111");
    cy.get("button[type=submit]").click();
    compareStyles([CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    compareHeads(["head", "", "", "", "", "", ""]);
    compareValues(["1111", "", "", "", "", "", ""]);
    compareTails(["tail", "", "", "", "", "", ""]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    cy.get("input").type("2222");
    cy.get("button[type=submit]").click();
    compareStyles([DEFAULT, CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    compareHeads(["head", "", "", "", "", "", ""]);
    compareValues(["1111", "2222", "", "", "", "", ""]);
    compareTails(["", "tail", "", "", "", "", ""]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    cy.get("button[type=button]").contains("Удалить").click();
    compareStyles([CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    compareHeads(["", "head", "", "", "", "", ""]);
    compareValues(["", "2222", "", "", "", "", ""]);
    compareTails(["", "tail", "", "", "", "", ""]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
  });

  it("Очистка очереди", () => {
    cy.get("input").type("1111");
    cy.get("button[type=submit]").click();
    compareStyles([CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    compareHeads(["head", "", "", "", "", "", ""]);
    compareValues(["1111", "", "", "", "", "", ""]);
    compareTails(["tail", "", "", "", "", "", ""]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    cy.get("input").type("2222");
    cy.get("button[type=submit]").click();
    compareStyles([DEFAULT, CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    compareHeads(["head", "", "", "", "", "", ""]);
    compareValues(["1111", "2222", "", "", "", "", ""]);
    compareTails(["", "tail", "", "", "", "", ""]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    cy.get("button[type=reset]").contains("Очистить").click();
    compareHeads(["", "", "", "", "", "", ""]);
    compareValues(["", "", "", "", "", "", ""]);
    compareTails(["", "", "", "", "", "", ""]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
  });
});
