import { useState } from "react";
import { CLI, get, History } from "../../util/helper";
import styles from "../../modules/CLI/Input.module.css";

const Input = () => {
  const path = get("path")?.join("/");
  const history: History[] = get("history")?.reverse();
  const cli = new CLI();
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);

  const cycleHistory = (e: any) => {
    if (e.key === "ArrowUp") {
      if (historyIndex < history?.length - 1) setHistoryIndex(historyIndex + 1);
      setValue(history[historyIndex]?.command)
    }

    if (e.key === "ArrowDown") {
      if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
      setValue(history[historyIndex]?.command)
    }
    console.log(historyIndex)
  }

  return <form className={styles.container} onSubmit={() => cli.parseCommand(value)}>
    <p className={styles.path}>{path}</p>
    <p>$</p>
    <input className={styles.input} type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={(e) => cycleHistory(e)} autoFocus />
    </form>
}
export default Input;