import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../utils/functions";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { LinkedList } from "./list/list";
import arrow from "../../images/icons/arrow.svg"

const linkedList = new LinkedList<number>();
//подгружаем значения для первичного отображения
linkedList.append(0)
linkedList.append(34)
linkedList.append(8)
linkedList.append(1)

export const ListPage: React.FC = () => {
  const [list, setList] = useState({
    array: linkedList.returnArray(),
    length: linkedList.getSize(),
  })

  const {values, handleChange, setValues} = useForm({
    value: "",
    index: ""
  });

  const [controls, setControls] = useState({
    addToHead: false,
    addToTail: false,
    deleteFromHead: false,
    deleteFromTail: false,
    addByIndex: false,
    deleteByIndex: false,
    all: false
  });

  const [loader, setLoader] = useState({
    addToHead: false,
    addToTail: false,
    deleteFromHead: false,
    deleteFromTail: false,
    addByIndex: false,
    deleteByIndex: false,
  });

  async function prependListItem(value: number) {
    value= Number(value);
    setControls({...controls, all: true})
    setLoader({...loader, addToHead: true});
    if (list.length === 0) {
      list.array.push({value: '', state: ElementStates.Changing, head: null, tail: null});
    }
    
    linkedList.prepend(value);
    list.array[0].head = value;
    setList({...list})

    await sleep(500);
    list.length += 1;
    list.array[0].head = null;
    if(list.length === 1) {
      list.array[0] = {value: value, state: ElementStates.Modified, head: null, tail: null};
    } else {
      list.array.unshift({value: value, state: ElementStates.Modified, head: null, tail: null})
    }
    setList({...list})

    await sleep(500);
    list.array[0].state = ElementStates.Default;
    setList({...list})
    setValues({...values, value:""})
    setLoader({...loader, addToHead: false});
    setControls({...controls, all: false})
  };

  async function appendListItem(value: number) {
    value= Number(value);
    setControls({...controls, all: true});
    setLoader({...loader, addToTail: true});
    if (list.length === 0) {
      list.array.push({value: '', state: ElementStates.Changing, head: null, tail: null});
    }

    linkedList.append(value);
    list.length += 1;
    list.array[list.array.length - 1].head = value;
    setList({...list});

    await sleep(500);

    list.array[list.array.length - 1].head = null;
    if (list.length === 1 ) {
      list.array[0] = {value: value, state: ElementStates.Modified, head: null, tail: null};
    } else {
      list.array.push({value: value, state: ElementStates.Modified, head: null, tail: null});
    }
    setList({...list});

    await sleep(500);
    list.array[list.array.length - 1].state = ElementStates.Default;
    setList({...list});

    setValues({...values, value:""});
    setLoader({...loader, addToTail: false});
    setControls({...controls, all: false})
  };

  async function deleteFromTail() {
    setControls({...controls, all: true})
    setLoader({...loader, deleteFromTail: true});
    linkedList.deleteLastNode();
    list.array[list.length - 1].tail = list.array[list.length - 1].value;
    list.array[list.length - 1].value = "";
    setList({...list})

    await sleep(500);
    setList({length: linkedList.getSize(), array:linkedList.returnArray()});

    setValues({...values, value:""})
    setLoader({...loader, deleteFromTail: false});
    setControls({...controls, all: false})
  };

  async function deleteFromHead() {
    setControls({...controls, all: true})
    setLoader({...loader, deleteFromHead: true});
    linkedList.deleteFirstNode();
    list.array[0].tail = list.array[0].value;
    list.array[0].value = ""
    setList({...list})
    
    await sleep(500);
    setList({length: linkedList.getSize(), array:linkedList.returnArray()});

    setValues({...values, value:""})
    setLoader({...loader, deleteFromHead: false});
    setControls({...controls, all: false})
  };

  async function addByIndex(value: number, index: number) {
    //проверка на валидность индекса
    if (index > list.length-1 || index < 0) {
      return;
    }
    setControls({...controls, all: true})
    setLoader({...loader, addByIndex: true});
    index = Number(index);
    value= Number(value);
    linkedList.addByIndex(value, index);

    for (let i = 0; i <= index; i++) {
      list.array[i].head = value;
      setList({...list})

      await sleep(500);
      list.array[i].head = null;
      list.array[i].state = ElementStates.Changing

      if (i == index) {
        list.array.forEach(item => {item.state = ElementStates.Default})
        list.array.splice(index, 0, {value: value, state: ElementStates.Modified, head: null, tail: null})
        list.length += 1;
        setList({...list})
      }
    }

    await sleep(500);
    list.array[index].state = ElementStates.Default;
    setList({...list})

    setValues({...values, index:""})
    setLoader({...loader, addByIndex: false});
    setControls({...controls, all: false})
  }

  async function deleteByIndex(index: number) {
    //проверка на валидность индекса
    if (index > list.length-1 || index < 0) {
      return;
    }

    setControls({...controls, all: true})
    setLoader({...loader, deleteByIndex: true});
    index = Number(index)
    linkedList.deleteByIndex(index);

    for (let i =0; i <= index; i++) {
      list.array[i].state = ElementStates.Changing
      setList({...list})
      await sleep(500);
    }
    
    list.array[index] = {...list.array[index], tail: list.array[index].value, state: ElementStates.Default, value: ''};
    setList({...list})

    await sleep(500);
    setList({length: linkedList.getSize(), array:linkedList.returnArray()});

    setValues({...values, index:""})
    setLoader({...loader, deleteByIndex: false});
    setControls({...controls, all: false})
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.controls} ${styles.topMargin}`}>
        <Input extraClass={styles.inputWidth} name={'value'} value={values.value} onChange={handleChange} maxLength={4} isLimitText={true}/>
        <Button extraClass={styles.smallButton} disabled={values.value === '' || controls.addToHead || controls.all} isLoader={loader.addToHead} text="Добавить в head" onClick={()=>prependListItem(values.value)}/>
        <Button extraClass={styles.smallButton} disabled={values.value === '' || controls.addToTail || controls.all} isLoader={loader.addToTail} text="Добавить в tail" onClick={()=>appendListItem(values.value)}/>
        <Button extraClass={styles.smallButton} disabled={list.length === 0 || controls.deleteFromHead || controls.all} isLoader={loader.deleteFromHead} onClick={()=>deleteFromHead()} text="Удалить из head"/>
        <Button extraClass={styles.smallButton} disabled={list.length === 0 || controls.deleteFromTail || controls.all} isLoader={loader.deleteFromTail} onClick={()=>deleteFromTail()} text="Удалить из tail"/>
      </div>
      <div className={styles.controls}>
        <Input extraClass={styles.inputWidth} type={'number'} name={'index'} value={values.index} onChange={handleChange}/>
        <Button
          extraClass={styles.bigButton}
          disabled={
            list.length === 0
            || values.index === ''
            || values.value === ''
            || controls.addByIndex
            || controls.all
            || values.index > list.length-1
            || values.index < 0
          }
          isLoader={loader.addByIndex}
          onClick={()=>addByIndex(values.value, values.index)}
          text="Добавить по индексу"
        />
        <Button
          extraClass={styles.bigButton}
          disabled={
            list.length === 0
            || values.index === ''
            || controls.deleteByIndex
            || controls.all
            || values.index > list.length-1
            || values.index < 0
          }
          isLoader={loader.deleteByIndex}
          onClick={()=>deleteByIndex(values.index)}
          text="Удалить по индексу"
        />
      </div>
      <ul className={styles.array}>
        {list.array.map((item, index) =>
          <li className={styles.list} key={index}>
            <Circle
              letter={String(item.value)}
              index={index}
              state={item.state}
              head={
                index === 0 && !item.head
                ? "head"
                : (item.head === null ? "" : <Circle isSmall state={ElementStates.Changing} letter={`${item.head}`}/>)
              }
              tail={index + 1 === list.length  && !item.tail
                ? 'tail'
                : (item.tail === null ? "" : <Circle isSmall state={ElementStates.Changing} letter={`${item.tail}`}/>)}
            />
            {index < list.length - 1 ? <img className={styles.arrow} src={arrow} alt="стрелка"/> : null}
          </li>
        )}
      </ul>
      {}
    </SolutionLayout>
  );
};
