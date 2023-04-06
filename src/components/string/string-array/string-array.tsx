import React, { useState } from "react";
import styles from "./string-array.module.css"
import { Circle } from "../../ui/circle/circle";
import { ElementStates } from "../../../types/element-states";

type TSymbolObject = {
  value: string,
  state: ElementStates
}

type TStringArray = {
  items: Array<TSymbolObject>
}

const StringArray: React.FC<TStringArray> = ({items}) => {

  return (
     <ul className={styles.array}>
        {items.map((item, index) => 
          <Circle key={index} letter={item.value} state={item.state}/>
        )}
     </ul>
  );
}
 
export default StringArray;
