import React, { useState } from "react";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "../../ui/circle/circle";
import styles from "./fibonacci-array.module.css"

interface FibonacciArrayProps {
  items?: Array<string | number>
}
 
const FibonacciArray: React.FunctionComponent<FibonacciArrayProps> = ({items}) => {

  return ( 
    <ul className={styles.array}>
      {items!.map((item, index) => 
        <Circle key={index} letter={String(item)} state={ElementStates.Default} index={index}/>
      )}
    </ul>    
   );
}
 
export default FibonacciArray;
