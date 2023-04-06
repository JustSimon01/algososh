import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css"
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/functions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {

  interface ISymbolObject {
    value: number,
    state: ElementStates
  }

  const [checkBox, setCheckBox] = useState({
    checked:"selection",
    disabled: false
  });

  const [sorting, setSorting] = useState({
    sorting: "ascending",
    isLoading: "none",
    disabled: false,
  });

  const [randArray, setRandArray] = useState<Array<ISymbolObject>>([]); //кнопка массива, добавить стейт и disabled

  const changeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox({...checkBox, checked: e.target.value})
  }

  const changeSorting = (string: string): void => {
    const objectsArray = randArray.map(item => {return {value: item.value, state: ElementStates.Default}})
    if (checkBox.checked === "selection") {
      setSorting({...sorting, sorting: string});
      setRandArray(objectsArray) 
      startSelectionSort(objectsArray, string);
    } else if (checkBox.checked === "bubble") {
      startBubbleSorting(objectsArray, string)
    }

  }

  function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const getRandArray = (): void => {
    let randArr = [];
    const randArrLength = randomInteger(1, 17);
    for (let i=0; i < randArrLength; i++) {
      randArr.push(randomInteger(1, 100))
    }
    const objectsArray = randArr.map(item => {return {value: item, state: ElementStates.Default}})
    setRandArray(objectsArray)   
  }

  async function startSelectionSort (arr: Array<ISymbolObject>, mode: string) {
    setCheckBox({...checkBox, disabled: true})
    setSorting({...sorting, isLoading: mode, disabled: true})

    for (let i = 0, l = arr.length, k = l - 1; i <= k; i++) {

      let indexMin = i;
      for (let j = i + 1; j < l; j++) {
        arr[arr.length-1].state = ElementStates.Default

          if (mode === "ascending" && arr[indexMin].value > arr[j].value) {
            indexMin = j;
          }
          
          if (mode === "descending" && arr[indexMin].value < arr[j].value) {
            indexMin = j;
          }

        arr[j].state = ElementStates.Changing
        arr[i].state = ElementStates.Changing
        setRandArray(JSON.parse(JSON.stringify(arr)))
        await sleep(SHORT_DELAY_IN_MS)
        arr[j].state = ElementStates.Default
        arr[i].state = ElementStates.Default
      }
      if (indexMin !== i) {
          [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
      }
      arr[i].state = ElementStates.Modified
      setRandArray(JSON.parse(JSON.stringify(arr)))
    }
    setCheckBox({...checkBox, disabled: false})
    setSorting({...sorting, isLoading: "none", disabled: false})
  }

  async function startBubbleSorting(arr: Array<ISymbolObject>, mode: string) {
    setCheckBox({...checkBox, disabled: true})
    setSorting({...sorting, isLoading: mode, disabled: true})
    for (let j = arr.length - 1; j >= 0; j--) {
      for (let i = 0; i < j; i++) {
        if (mode === "ascending" && arr[i].value > arr[i + 1].value) {

          arr[i+1].state = ElementStates.Changing
          arr[i].state = ElementStates.Changing

          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;

          setRandArray(JSON.parse(JSON.stringify(arr)))
          await sleep(SHORT_DELAY_IN_MS)

          arr[i+1].state = ElementStates.Default
          arr[i].state = ElementStates.Default

        } else if (mode === "descending" && arr[i].value < arr[i + 1].value) {

          arr[i+1].state = ElementStates.Changing
          arr[i].state = ElementStates.Changing

          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;

          setRandArray(JSON.parse(JSON.stringify(arr)))
          await sleep(SHORT_DELAY_IN_MS)

          arr[i+1].state = ElementStates.Default
          arr[i].state = ElementStates.Default

        }
      }
      arr[j].state = ElementStates.Modified
      setRandArray(JSON.parse(JSON.stringify(arr)))
    }
    setCheckBox({...checkBox, disabled: false})
    setSorting({...sorting, isLoading: "none", disabled: false})
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controls}>
        <div className={styles.radioButtons}>
          <RadioInput name="sort-type" value={'selection'} checked={checkBox.checked === 'selection' ? true : false} disabled={checkBox.disabled} onChange={changeCheckBox} label={'Выбор'}/>
          <RadioInput name="sort-type" value={'bubble'} checked={checkBox.checked === 'bubble' ? true : false} disabled={checkBox.disabled} onChange={changeCheckBox} label={'Пузырек'}/>
        </div>
        <div className={styles.sorting}>
          <Button type={"button"} sorting={Direction.Ascending} disabled={!randArray.length || sorting.disabled} isLoader={sorting.isLoading === 'ascending' ? true : false} text="По возрастанию" extraClass={styles.button} onClick={() => changeSorting("ascending")}/>
          <Button type={"button"} sorting={Direction.Descending} disabled={!randArray.length || sorting.disabled} isLoader={sorting.isLoading ==='descending' ? true : false} text="По убыванию" extraClass={styles.button} onClick={() => changeSorting("descending")}/>
        </div>
        <Button type={"button"}  text="Новый массив" disabled={sorting.disabled} extraClass={styles.button} onClick={getRandArray}/>
      </div>
      <div className={styles.array}>
        {randArray.map((item, index) =><Column key={index} index={item.value} state={item.state}/>)}
      </div>
    </SolutionLayout>
  );
};
