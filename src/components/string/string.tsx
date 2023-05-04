import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import StringArray from "./string-array/string-array";
import { sleep } from "../../utils/functions";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { ISymbolObject } from "./utils";
import { invertArray } from "./utils";

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
