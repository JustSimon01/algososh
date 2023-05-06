import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { ISymbolObject, startBubbleSorting, startSelectionSort } from "./utils";

export const SortingPage: React.FC = () => {
  const [checkBox, setCheckBox] = useState({
    checked: "selection",
    disabled: false,
  });

  const [sorting, setSorting] = useState({
    sorting: "ascending",
    isLoading: "none",
    disabled: false,
  });

  const [randArray, setRandArray] = useState<Array<ISymbolObject>>([]); //кнопка массива, добавить стейт и disabled

  const changeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox({ ...checkBox, checked: e.target.value });
  };

  async function changeSorting(mode: string) {
    const objectsArray = randArray.map((item) => {
      return { value: item.value, state: ElementStates.Default };
    });
    if (checkBox.checked === "selection") {
      setCheckBox({ ...checkBox, disabled: true });
      setSorting({ ...sorting, isLoading: mode, sorting: mode, disabled: true });
      await startSelectionSort(objectsArray, mode, setRandArray);
      setCheckBox({ ...checkBox, disabled: false });
      setSorting({ ...sorting, isLoading: "none", disabled: false });
    } else if (checkBox.checked === "bubble") {
      setCheckBox({ ...checkBox, disabled: true });
      setSorting({ ...sorting, isLoading: mode, sorting: mode, disabled: true });
      await startBubbleSorting(objectsArray, mode, setRandArray);
      setCheckBox({ ...checkBox, disabled: false });
      setSorting({ ...sorting, isLoading: "none", disabled: false });
    }
  }

  function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const getRandArray = (): void => {
    let randArr = [];
    const randArrLength = randomInteger(1, 17);
    for (let i = 0; i < randArrLength; i++) {
      randArr.push(randomInteger(1, 100));
    }
    const objectsArray = randArr.map((item) => {
      return { value: item, state: ElementStates.Default };
    });
    setRandArray(objectsArray);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controls}>
        <div className={styles.radioButtons}>
          <RadioInput
            name="sort-type"
            value={"selection"}
            checked={checkBox.checked === "selection" ? true : false}
            disabled={checkBox.disabled}
            onChange={changeCheckBox}
            label={"Выбор"}
          />
          <RadioInput
            name="sort-type"
            value={"bubble"}
            checked={checkBox.checked === "bubble" ? true : false}
            disabled={checkBox.disabled}
            onChange={changeCheckBox}
            label={"Пузырек"}
          />
        </div>
        <div className={styles.sorting}>
          <Button
            type={"button"}
            sorting={Direction.Ascending}
            disabled={!randArray.length || sorting.disabled}
            isLoader={sorting.isLoading === "ascending" ? true : false}
            text="По возрастанию"
            extraClass={styles.button}
            onClick={() => changeSorting("ascending")}
          />
          <Button
            type={"button"}
            sorting={Direction.Descending}
            disabled={!randArray.length || sorting.disabled}
            isLoader={sorting.isLoading === "descending" ? true : false}
            text="По убыванию"
            extraClass={styles.button}
            onClick={() => changeSorting("descending")}
          />
        </div>
        <Button
          type={"button"}
          text="Новый массив"
          disabled={sorting.disabled}
          extraClass={styles.button}
          onClick={getRandArray}
        />
      </div>
      <div className={styles.array}>
        {randArray.map((item, index) => (
          <Column key={index} index={item.value} state={item.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
