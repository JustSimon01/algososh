import { compareValues } from "./utils";

describe('Тестирование алгоритма: "Фибоначчи"', () => {
  beforeEach(() => {
    cy.visit("#/fibonacci");
  });

  it("Кнопка должна быть заблокированна при пустом input", () => {
    cy.get("input").should("be.empty");
    cy.get("button[type=submit]").should("be.disabled");
    cy.get("input").type("123456");
    cy.get("button[type=submit]").should("not.be.disabled");
    cy.get("input").clear();
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("генерация строки для числа 5", () => {
    cy.get("input").type("5");
    cy.get("button[type=submit]").click();

    //проверяем варианты поочередно, что бы удостовериться что не отрисовывается сразу последний массив
    compareValues(["1"]);
    compareValues(["1", "1"]);
    compareValues(["1", "1", "2"]);
    compareValues(["1", "1", "2", "3"]);
    compareValues(["1", "1", "2", "3", "5"]);
    compareValues(["1", "1", "2", "3", "5", "8"]);
  });
});
