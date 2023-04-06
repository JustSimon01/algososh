import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css"
import FibonacciArray from "./fibonacci-array/fibonacci-array";
import { sleep } from "../../utils/functions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {

  const [loader, setLoader] = useState<boolean>(false);
  const [string, setString] = useState<string>('');
  const [array, setArray] = useState<Array<string | number>>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setString(e.target.value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (1 <= Number(string) && Number(string) <= 19){
      fibonacci(string);
    } else {
      alert('число должно быть от 1 до 19')
    }
  }
  
  async function fibonacci (value: string ) {
    let prev = 0, next = 1;
    let tempArr: Array<string | number> = [];
    setLoader(true)
    for(let i = 0; i <= Number(value); i++){
      await sleep(SHORT_DELAY_IN_MS);

      let temp = next;
      next = prev + next;
      prev = temp;
      tempArr = [...tempArr, prev]
      setArray(tempArr)
    }
    setLoader(false)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={`${styles.content}`} onSubmit={onSubmit}>
        <Input value={string} isLimitText={true} type={'number'} max={19} onChange={onChange}/>
        <Button type={"submit"} disabled={!string} text="Рассчитать" isLoader={loader}/>
      </form>
      <div className={`${styles.visual}`}>
        <FibonacciArray items={array}/>
      </div>
    </SolutionLayout>
  );
};
