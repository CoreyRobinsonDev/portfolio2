import { useState } from "react";
import { get, History } from "../../util/helper";
import { CLI } from "../../util/CLI";
import styles from "../../modules/CLI/Input.module.css";

const Input = () => {
  const path = get("path")?.join("/");
  const history: History[] = get("history")?.reverse();
  const cli = new CLI();
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [placeholder, setPlaceholder] = useState("");
  
  const cycleHistory = (e: any) => {
    if (e.key === "ArrowUp") {
      if (historyIndex < history?.length - 1) setHistoryIndex(historyIndex + 1);
      setValue(history[historyIndex]?.commandStr)
    }
    
    if (e.key === "ArrowDown") {
      if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
      setValue(history[historyIndex]?.commandStr)
    }
  }

  const autocomplete = () => {
    setValue(value + placeholder);
    setPlaceholder("");
  }

  const handleKeyUp = (e: any) => {
    const key = e.key;
    if (key === "ArrowDown" || key === "ArrowUp") cycleHistory(e);
    if (key === "ArrowRight") autocomplete();
  }

  const handleChange = (e: any) => {
    const str = e.target.value;
    setValue(str);
    setPlaceholder(cli.predictCommand(str))
  }

  return <form className={styles.container} action="/" onSubmit={() => cli.parseCommand(value)}>
    <p className={styles.path}>{path}</p>
    <p>$</p>
    <p className={styles.placeholder} style={{left: `${value?.length + path?.length + 2}.7ch`}}>{placeholder}</p>
    <input className={styles.input} type="text" value={value} onChange={(e) => handleChange(e)} onKeyUp={(e) => handleKeyUp(e)} autoFocus />
    </form>
}
export default Input;