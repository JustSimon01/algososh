import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import StringArray from "./string-array/string-array";
import { sleep } from "../../utils/functions";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

interface ISymbolObject {
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

export const StringComponent: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [string, setString] = useState<string | number>("");
  const [array, setArray] = useState<Array<ISymbolObject>>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    invertArray(string, setArray, setLoader);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={`${styles.content}`} onSubmit={onSubmit}>
        <Input data-testid="array" value={string} isLimitText={true} maxLength={11} onChange={onChange} />
        <Button type={"submit"} text="Развернуть" disabled={!string} isLoader={loader} />
      </form>
      <div className={`${styles.visual}`}>
        <StringArray data-testid="reversed-array" items={array} />
      </div>
    </SolutionLayout>
  );
};
