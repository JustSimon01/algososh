import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/functions";

export interface ISymbolObject {
  value: string;
  state: ElementStates;
}

export async function invertArray(
  data: string | number,
  setArray?: React.Dispatch<React.SetStateAction<ISymbolObject[]>>,
  setLoader?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const array = (data as string).split("");

  if (array.length === 0) return data;

  const objectsArray = array.map((item) => {
    return { value: item, state: ElementStates.Default };
  });
  let start = 0;
  let end = array.length - 1;
  objectsArray[start].state = ElementStates.Changing;
  objectsArray[end].state = ElementStates.Changing;
  setLoader && setLoader(true);

  while (start <= end) {
    setArray && setArray(objectsArray);
    await sleep(DELAY_IN_MS);
    let temp = objectsArray[start];
    objectsArray[start] = objectsArray[end];
    objectsArray[end] = temp;

    if (start + 1 <= end - 1) {
      objectsArray[start + 1].state = ElementStates.Changing;
      objectsArray[end - 1].state = ElementStates.Changing;
    }

    objectsArray[start].state = ElementStates.Modified;
    objectsArray[end].state = ElementStates.Modified;

    setArray && setArray(JSON.parse(JSON.stringify(objectsArray)));
    start++;
    end--;
  }
  setLoader && setLoader(false);
  return objectsArray.map((item) => item.value).join("");
}
