import React, { useState } from "react";
import { useForm } from "../../utils/hooks";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css"
import { Queue } from "./queue/queue";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../utils/functions";
import { ElementStates } from "../../types/element-states";

const queue = new Queue<number>(7);

export const QueuePage: React.FC = () => {
  interface IqueueArray {
    array: (number | undefined)[],
    head: number,
    tail: number,
    modifiedItem: number | null
  }

  const queueLength = queue.getLength();
  const [queueArray, setQueueArray] = useState<IqueueArray>({
    array: queue.getQueue(),
    head: queue.getHead(),
    tail: queue.getTail(),
    modifiedItem: null
  });
  const {values, handleChange, setValues} = useForm(
    {
      item: "",
    });
  const [controls, setControls] = useState({
    add: false,
    delete: false,
    clear: false
  })
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(values.item) {

      setQueueArray({...queueArray, modifiedItem: queue.getTail()})
      setControls({...controls, add: true, delete: true, clear: true})

      await sleep(500)

      queue.enqueue(values.item)
      setQueueArray({...queueArray, array: queue.getQueue(), head: queue.getHead(), tail: queue.getTail() , modifiedItem: null})
      setControls({...controls, add: false, delete: false, clear: false})
      setValues({item: ''})
    }
  }

  async function dequeue() {

    setQueueArray({...queueArray, modifiedItem: queue.getHead()})
    setControls({...controls, add: true, delete: true, clear: true})

    await sleep(500)

    queue.dequeue()
    setQueueArray({...queueArray, array: queue.getQueue(), head: queue.getHead(), tail: queue.getTail() , modifiedItem: null})
    setControls({...controls, add: false, delete: false, clear: false})
  }

  function clear() {
    queue.clear();
    setQueueArray({...queueArray, array: queue.getQueue(), head: queue.getHead(), tail: queue.getTail()})
  }
  
  return (
    <SolutionLayout title="Очередь">
      <form className={styles.controls} onSubmit={onSubmit}>
        <div className={styles.controlsMain}>
          <Input isLimitText={true} value={values.item} name={'item'} maxLength={4} onChange={handleChange}/>
          <Button type={'submit'} extraClass={styles.smallButton} text="Добавить" disabled={controls.add}/>
          <Button type={'button'} extraClass={styles.smallButton} text="Удалить" disabled={queueLength === 0 || controls.delete} onClick={dequeue}/>
        </div>
        <Button type={'reset'} extraClass={styles.smallButton} text="Очистить" disabled={queueArray.tail  === 0 || controls.clear}  onClick={clear}/>
      </form>
      <div className={styles.array}>
        {queueArray.array.map((item, index) => 
          <Circle 
            letter={item?.toString()}
            key={index}
            index ={index}
            state={
              queueArray.modifiedItem === index ? ElementStates.Changing : ElementStates.Default}
            head={queueArray.array[index] && index === queueArray.head ? "head" : null}
            tail={queueArray.array[index] && index+1 === queueArray.tail ? "tail" : null}
          />
        )}
      </div>
    </SolutionLayout>
  );
};
