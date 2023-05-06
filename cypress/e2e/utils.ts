export const MODIFYED = "modified";
export const CHANGING = "changing";
export const DEFAULT = "default";

export const compareStyles = (stylesArray: Array<string>): void => {
  cy.get("[data-testid='testedCircleColor']")
    .not("[class*=small]")
    .should((items) => {
      const arrayOfClasses = Array.from(items, (item) => {
        return item.classList.value;
      });

      arrayOfClasses.forEach((className, index) => {
        expect(className).contain(stylesArray[index]);
      });
    });
};

export const compareValues = (valuesArray: Array<string>): void => {
  cy.get("[data-testid='testedCircleColor']")
    .not("[class*=small]")
    .should((items) => {
      const arrayOfCirclesValues = Array.from(items, (item) => {
        return item.textContent;
      });
      expect(valuesArray).eql(arrayOfCirclesValues);
    });
};

export const compareHeads = (valuesArray: Array<string | null>): void => {
  cy.get("[data-testid='testedCircleHead']")
    .not("[class*=small]")
    .should((items) => {
      const arrayOfCirclesHeads = Array.from(items, (item) => {
        return item.textContent;
      });
      expect(valuesArray).eql(arrayOfCirclesHeads);
    });
};

export const compareTails = (valuesArray: Array<string | null>): void => {
  cy.get("[data-testid='testedCircleTail']")
    .not("[class*=small]")
    .should((items) => {
      const arrayOfCirclesHeads = Array.from(items, (item) => {
        return item.textContent;
      });
      expect(valuesArray).eql(arrayOfCirclesHeads);
    });
};

export const circleInHead = (index: number, text: string, colorStyle: string): void => {
  cy.get("[data-testid='testedCircleHead']")
    .eq(index)
    .within(() => {
      cy.get("[data-testid='testedCircleColor']").should((element) => {
        expect(element[0].classList.value).contain(colorStyle);
      });
    });
  cy.get("[data-testid='testedCircleHead']")
    .eq(index)
    .contains(RegExp(`^${text}$`));
};

export const noCircleInHead = (index: number) => {
  cy.get("[data-testid='testedCircleHead']").eq(index).should("not.contain", "[data-testid='testedCircleColor']");
};

export const circleInTail = (index: number, text: string, colorStyle: string): void => {
  cy.get("[data-testid='testedCircleTail']")
    .eq(index)
    .within(() => {
      cy.get("[data-testid='testedCircleColor']").should((element) => {
        expect(element[0].classList.value).contain(colorStyle);
      });
    });

  cy.get("[data-testid='testedCircleTail']")
    .eq(index)
    .contains(RegExp(`^${text}$`));
};

export const noCircleInTail = (index: number) => {
  cy.get("[data-testid='testedCircleTail']").eq(index).should("not.contain", "[data-testid='testedCircleColor']");
};
