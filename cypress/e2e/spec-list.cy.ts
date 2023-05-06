import {
  compareStyles,
  compareValues,
  compareHeads,
  compareTails,
  circleInHead,
  circleInTail,
  noCircleInHead,
  noCircleInTail,
  MODIFYED,
  CHANGING,
  DEFAULT,
} from "./utils";

describe('Тестирование алгоритма: "Связанный список"', () => {
  beforeEach(() => {
    cy.visit("#/list");
  });

  it("Изначальная длинна массива равна 4", () => {
    cy.get("[data-testid='testedCircleColor']").should("have.length", 4);
  });

  it("Кнопки должны быть заблокированны при пустом input", () => {
    //заполнен только первый инпут
    cy.get("input").first().should("be.empty");
    cy.get("input").eq(1).should("be.empty");
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");

    cy.get("input").first().type("1234");
    cy.get("input").eq(1).should("be.empty");
    cy.contains("button[type=button]", "Добавить в head").should("not.be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("not.be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");

    cy.get("input").first().clear();
    cy.get("input").eq(1).should("be.empty");
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");

    //заполнен только второй инпут
    cy.get("input").first().should("be.empty");
    cy.get("input").eq(1).should("be.empty");
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");

    cy.get("input").first().should("be.empty");
    cy.get("input").eq(1).type("2");
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("not.be.disabled");

    cy.get("input").first().should("be.empty");
    cy.get("input").eq(1).clear();
    cy.contains("button[type=button]", "Добавить в head").should("be.disabled");
    cy.contains("button[type=button]", "Добавить в tail").should("be.disabled");
    cy.contains("button[type=button]", "Добавить по индексу").should("be.disabled");
    cy.contains("button[type=button]", "Удалить по индексу").should("be.disabled");

    //заполнены оба инпута
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

  it("Блокировка кнопок при пустом массиве", () => {
    cy.get("[data-testid='testedCircleColor']").should("have.length", 4);
    cy.contains("button[type=button]", "Удалить из head").click();
    cy.contains("button[type=button]", "Удалить из head").click();
    cy.contains("button[type=button]", "Удалить из tail").click();
    cy.contains("button[type=button]", "Удалить из tail").click();
    cy.get("[data-testid='testedCircleColor']").should("have.length", 0);
    cy.contains("button[type=button]", "Удалить из head").should("be.disabled");
    cy.contains("button[type=button]", "Удалить из tail").should("be.disabled");
  });

  it("Добавление элемента в Head", () => {
    cy.get("input").first().type("1234");
    cy.contains("button[type=button]", "Добавить в head").click();
    circleInHead(0, "1234", CHANGING);
    compareHeads(["head", "", "", "", ""]);
    compareValues(["1234", "0", "34", "8", "1"]);
    noCircleInHead(0);
    compareStyles([MODIFYED, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
  });

  it("Удаление элемента из Head", () => {
    compareValues(["0", "34", "8", "1"]);
    cy.contains("button[type=button]", "Удалить из head").click();
    cy.get("[data-testid='testedCircleColor']");
    circleInTail(0, "0", CHANGING);
    compareValues(["", "34", "8", "1"]);
    noCircleInTail(0);
    compareHeads(["head", "", ""]);
    compareValues(["34", "8", "1"]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT]);
  });

  it("Добавление элемента в Tail", () => {
    cy.get("input").first().type("1234");
    cy.contains("button[type=button]", "Добавить в tail").click();
    circleInHead(3, "1234", CHANGING);
    compareValues(["0", "34", "8", "1", "1234"]);
    noCircleInHead(3);
    compareTails(["", "", "", "", "tail"]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, MODIFYED]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
  });

  it("Удаление элемента из Tail", () => {
    compareValues(["0", "34", "8", "1"]);
    cy.contains("button[type=button]", "Удалить из tail").click();
    cy.get("[data-testid='testedCircleColor']");
    circleInTail(3, "1", CHANGING);
    compareValues(["0", "34", "8", ""]);
    noCircleInTail(2);
    compareTails(["", "", "tail"]);
    compareValues(["0", "34", "8"]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT]);
  });

  it("Добавление элемента по индексу", () => {
    cy.get("input").first().type("1234");
    cy.get("input").eq(1).type("2");
    compareHeads(["head", "", "", ""]);
    compareTails(["", "", "", "tail"]);
    cy.contains("button[type=button]", "Добавить по индексу").click();
    circleInHead(0, "1234", CHANGING);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    circleInHead(1, "1234", CHANGING);
    noCircleInHead(0);
    compareStyles([CHANGING, DEFAULT, DEFAULT, DEFAULT]);
    circleInHead(2, "1234", CHANGING);
    noCircleInHead(1);
    compareStyles([CHANGING, CHANGING, DEFAULT, DEFAULT]);
    compareStyles([DEFAULT, DEFAULT, MODIFYED, DEFAULT, DEFAULT]);
    compareStyles([DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT]);
    compareHeads(["head", "", "", "", ""]);
    compareTails(["", "", "", "", "tail"]);
  });
});
