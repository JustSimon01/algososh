import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/functions";

export interface ISymbolObject {
  value: number;
  state: ElementStates;
}

export async function startSelectionSort(
  arr: Array<ISymbolObject>,
  mode: string,
  setRandArray?: React.Dispatch<React.SetStateAction<ISymbolObject[]>>
) {
  for (let i = 0, l = arr.length, k = l - 1; i <= k; i++) {
    let indexMin = i;
    for (let j = i + 1; j < l; j++) {
      arr[arr.length - 1].state = ElementStates.Default;

      if (mode === "ascending" && arr[indexMin].value > arr[j].value) {
        indexMin = j;
      }

      if (mode === "descending" && arr[indexMin].value < arr[j].value) {
        indexMin = j;
      }

      arr[j].state = ElementStates.Changing;
      arr[i].state = ElementStates.Changing;
      setRandArray && setRandArray(JSON.parse(JSON.stringify(arr)));
      await sleep(SHORT_DELAY_IN_MS);
      arr[j].state = ElementStates.Default;
      arr[i].state = ElementStates.Default;
    }
    if (indexMin !== i) {
      [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
    }
    arr[i].state = ElementStates.Modified;
    setRandArray && setRandArray(JSON.parse(JSON.stringify(arr)));
  }
  return arr;
}

export async function startBubbleSorting(
  arr: Array<ISymbolObject>,
  mode: string,
  setRandArray?: React.Dispatch<React.SetStateAction<ISymbolObject[]>>
) {
  for (let j = arr.length - 1; j >= 0; j--) {
    for (let i = 0; i < j; i++) {
      if (mode === "ascending" && arr[i].value > arr[i + 1].value) {
        arr[i + 1].state = ElementStates.Changing;
        arr[i].state = ElementStates.Changing;

        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;

        setRandArray && setRandArray(JSON.parse(JSON.stringify(arr)));
        await sleep(SHORT_DELAY_IN_MS);

        arr[i + 1].state = ElementStates.Default;
        arr[i].state = ElementStates.Default;
      } else if (mode === "descending" && arr[i].value < arr[i + 1].value) {
        arr[i + 1].state = ElementStates.Changing;
        arr[i].state = ElementStates.Changing;

        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;

        setRandArray && setRandArray(JSON.parse(JSON.stringify(arr)));
        await sleep(SHORT_DELAY_IN_MS);

        arr[i + 1].state = ElementStates.Default;
        arr[i].state = ElementStates.Default;
      }
    }
    arr[j].state = ElementStates.Modified;
    setRandArray && setRandArray(JSON.parse(JSON.stringify(arr)));
  }
  return arr;
}
