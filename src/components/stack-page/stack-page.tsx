import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css"
import { Stack } from "./stack/stack";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../utils/functions";
import { ElementStates } from "../../types/element-states";

const stack = new Stack<string>();

export const StackPage: React.FC = () => {

  interface IItem {
    value?: string;
    state?: ElementStates
  }
  
  const [array, setArray] = useState<IItem[]>([]);
  const [string, setString] = useState<string>('');
  const [controls, setControls] = useState({
    add: false,
    delete: false,
    clear: false
  })


  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setString(e.target.value);
  }

  async function onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    stack.push(string);
    setArray([...array, { value: stack.peak()!, state: ElementStates.Changing }]);
    setString('');
    setControls({...controls, add: true, delete: true, clear: true})
    await sleep(500);
    setArray([...array, { value: stack.peak()!, state: ElementStates.Default }]);
    setControls({...controls, add: false, delete: false, clear: false})
  }

  async function deleteLast() {
    array.at(-1)!.state = ElementStates.Changing
    setArray([...array]);
    setControls({...controls, add: true, delete: true, clear: true})
    await sleep(500);
    stack.pop();
    array.pop();
    if (array.length > 0) array.at(-1)!.state = ElementStates.Default
    setArray([...array]);
    setControls({...controls, add: false, delete: false, clear: false})
  }

  const clear = () => {
   stack.clear();
   setArray([])
  }


  return (
    <SolutionLayout title="Стек">
      <form className={styles.controls} onSubmit={onSubmit}>
        <div className={styles.controlsMain}>
          <Input isLimitText={true} value={string} maxLength={4} onChange={onChange}/>
          <Button type={'submit'} extraClass={styles.smallButton} disabled={!string || controls.add} text="Добавить"/>
          <Button type={'button'} extraClass={styles.smallButton} disabled={array.length === 0 || controls.delete} onClick={deleteLast} text="Удалить"/>
        </div>
        <Button type={'reset'} extraClass={styles.smallButton} disabled={array.length === 0 || controls.clear} onClick={clear} text="Очистить"/>
      </form>
      <div className={styles.array}>
        {array.map((item, index)=><Circle letter={item.value} key={index} state={item.state} head={stack.tail === index + 1 ? 'tail' : null} index={index}/>)}
      </div>
    </SolutionLayout>
  );
};
