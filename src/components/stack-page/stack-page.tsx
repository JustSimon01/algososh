import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css"
import { Stack } from "./stack/stack";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../utils/functions";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

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

    setControls({...controls, add: true});
    stack.push(string);
    setArray([...array, { value: stack.peak()!, state: ElementStates.Changing }]);
    setString('');

    await sleep(SHORT_DELAY_IN_MS);
    setArray([...array, { value: stack.peak()!, state: ElementStates.Default }]);
    setControls({...controls, add: false});
  }

  async function deleteLast() {
    setControls({...controls, delete: true});
    array.at(-1)!.state = ElementStates.Changing
    setArray([...array]);

    await sleep(SHORT_DELAY_IN_MS);
    stack.pop();
    array.pop();
    if (array.length > 0) array.at(-1)!.state = ElementStates.Default
    setArray([...array]);
    setControls({...controls, delete: false});
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
          <Button type={'submit'} extraClass={styles.smallButton} isLoader={controls.add} disabled={!string || controls.delete || controls.clear } text="Добавить"/>
          <Button type={'button'} extraClass={styles.smallButton} isLoader={controls.delete} disabled={array.length === 0 || controls.add || controls.clear } onClick={deleteLast} text="Удалить"/>
        </div>
        <Button type={'reset'} extraClass={styles.smallButton} isLoader={controls.clear} disabled={array.length === 0 || controls.delete || controls.add} onClick={clear} text="Очистить"/>
      </form>
      <div className={styles.array}>
        {array.map((item, index)=><Circle letter={item.value} key={index} state={item.state} head={stack.tail === index + 1 ? 'top' : null} index={index}/>)}
      </div>
    </SolutionLayout>
  );
};
