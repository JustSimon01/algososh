import { ElementStates } from "../../types/element-states";
import { startSelectionSort, startBubbleSorting } from "./utils";

describe("Тесты сортировки массива выбором", () => {
  test("По возрастанию, массив из нескольких элементов", async () => {
    expect(
      await startSelectionSort(
        [
          { value: 2, state: ElementStates.Default },
          { value: 3, state: ElementStates.Default },
          { value: 1, state: ElementStates.Default },
          { value: 4, state: ElementStates.Default },
        ],
        "ascending"
      )
    ).toEqual([
      { value: 1, state: ElementStates.Modified },
      { value: 2, state: ElementStates.Modified },
      { value: 3, state: ElementStates.Modified },
      { value: 4, state: ElementStates.Modified },
    ]);
  });

  test("По возрастанию, массив из одного элемента", async () => {
    expect(await startSelectionSort([{ value: 1, state: ElementStates.Default }], "ascending")).toEqual([
      { value: 1, state: ElementStates.Modified },
    ]);
  });

  test("По возрастанию, пустой массив", async () => {
    expect(await startSelectionSort([], "ascending")).toEqual([]);
  });

  test("По убыванию, массив из нескольких элементов", async () => {
    expect(
      await startSelectionSort(
        [
          { value: 2, state: ElementStates.Default },
          { value: 3, state: ElementStates.Default },
          { value: 1, state: ElementStates.Default },
          { value: 4, state: ElementStates.Default },
        ],
        "descending"
      )
    ).toEqual([
      { value: 4, state: ElementStates.Modified },
      { value: 3, state: ElementStates.Modified },
      { value: 2, state: ElementStates.Modified },
      { value: 1, state: ElementStates.Modified },
    ]);
  });

  test("По убыванию, массив из одного элемента", async () => {
    expect(await startSelectionSort([{ value: 1, state: ElementStates.Default }], "descending")).toEqual([
      { value: 1, state: ElementStates.Modified },
    ]);
  });

  test("По убыванию, пустой массив", async () => {
    expect(await startSelectionSort([], "descending")).toEqual([]);
  });
});

describe("Тесты сортировки массива 'пузырьком'", () => {
  test("По возрастанию, массив из нескольких элементов", async () => {
    expect(
      await startBubbleSorting(
        [
          { value: 2, state: ElementStates.Default },
          { value: 3, state: ElementStates.Default },
          { value: 1, state: ElementStates.Default },
          { value: 4, state: ElementStates.Default },
        ],
        "ascending"
      )
    ).toEqual([
      { value: 1, state: ElementStates.Modified },
      { value: 2, state: ElementStates.Modified },
      { value: 3, state: ElementStates.Modified },
      { value: 4, state: ElementStates.Modified },
    ]);
  });

  test("По возрастанию, массив из одного элемента", async () => {
    expect(await startBubbleSorting([{ value: 1, state: ElementStates.Default }], "ascending")).toEqual([
      { value: 1, state: ElementStates.Modified },
    ]);
  });

  test("По возрастанию, пустой массив", async () => {
    expect(await startBubbleSorting([], "ascending")).toEqual([]);
  });

  test("По убыванию, массив из нескольких элементов", async () => {
    expect(
      await startBubbleSorting(
        [
          { value: 2, state: ElementStates.Default },
          { value: 3, state: ElementStates.Default },
          { value: 1, state: ElementStates.Default },
          { value: 4, state: ElementStates.Default },
        ],
        "descending"
      )
    ).toEqual([
      { value: 4, state: ElementStates.Modified },
      { value: 3, state: ElementStates.Modified },
      { value: 2, state: ElementStates.Modified },
      { value: 1, state: ElementStates.Modified },
    ]);
  });

  test("По убыванию, массив из одного элемента", async () => {
    expect(await startBubbleSorting([{ value: 1, state: ElementStates.Default }], "descending")).toEqual([
      { value: 1, state: ElementStates.Modified },
    ]);
  });

  test("По убыванию, пустой массив", async () => {
    expect(await startBubbleSorting([], "descending")).toEqual([]);
  });
});
