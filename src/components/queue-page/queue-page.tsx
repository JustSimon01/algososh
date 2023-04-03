import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css"
import { Queue } from "./queue/queue";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../utils/functions";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.controls} >
        <div className={styles.controlsMain}>
          <Input isLimitText={true}  maxLength={4} />
          <Button type={'submit'} extraClass={styles.smallButton} text="Добавить"/>
          <Button type={'button'} extraClass={styles.smallButton} text="Удалить"/>
        </div>
        <Button type={'reset'} extraClass={styles.smallButton} text="Очистить"/>
      </form>
      <div className={styles.array}>
      <Circle letter={'1'} key={'index'} />
      </div>
    </SolutionLayout>
  );
};
