import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import StringArray from "./string-array/string-array";
import { sleep } from "../../utils/functions";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {

  interface ISymbolObject {
    value: string,
    state: ElementStates
  }
  const [loader, setLoader] = useState<boolean>(false);
  const [string, setString] = useState<string | number>('');
  const [array, setArray] = useState<Array<ISymbolObject>>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setString( e.target.value );
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    invertArray(string);
  }

  async function invertArray (data: string | number) {
    const array = (data as string).split('');
    const objectsArray = array.map(item => {return {value: item, state: ElementStates.Default}})
    let start = 0;
    let end = array.length - 1;
    objectsArray[start].state = ElementStates.Changing;
    objectsArray[end].state = ElementStates.Changing;
    setLoader(true)

      while (start <= end) {
        setArray(objectsArray)
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

        setArray(JSON.parse(JSON.stringify(objectsArray)))
        start++;
        end--;
    }
    setLoader(false)
  }

  return (
    <SolutionLayout title="Строка">
      <form className={`${styles.content}`} onSubmit={onSubmit}>
        <Input value={string} isLimitText={true} maxLength={11} onChange={onChange}/>
        <Button type={"submit"} text="Развернуть" disabled={!string} isLoader={loader}/>
      </form>
      <div className={`${styles.visual}`}>
        <StringArray items={array}/>
      </div>
    </SolutionLayout>
  );
};
