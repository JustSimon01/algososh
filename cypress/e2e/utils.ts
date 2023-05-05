export const compareStyles = (stylesArray: Array<string>): void => {
  cy.get("[data-testid='testedCircleColor']").should((items) => {
    const arrayOfClasses = Array.from(items, (item) => {
      return item.classList.value;
    });

    arrayOfClasses.forEach((className, index) => {
      expect(className).contain(stylesArray[index]);
    });
  });
};

export const compareValues = (valuesArray: Array<string>): void => {
  cy.get("[data-testid='testedCircleColor']").should((items) => {
    const arrayOfCirclesValues = Array.from(items, (item) => {
      return item.textContent;
    });
    expect(valuesArray).eql(arrayOfCirclesValues);
  });
};

export const compareHeads = (valuesArray: Array<string | null>): void => {
  cy.get("[data-testid='testedCircleHead']").should((items) => {
    const arrayOfCirclesHeads = Array.from(items, (item) => {
      return item.textContent;
    });
    expect(valuesArray).eql(arrayOfCirclesHeads);
  });
};

export const compareTails = (valuesArray: Array<string | null>): void => {
  cy.get("[data-testid='testedCircleTail']").should((items) => {
    const arrayOfCirclesHeads = Array.from(items, (item) => {
      return item.textContent;
    });
    expect(valuesArray).eql(arrayOfCirclesHeads);
  });
};
