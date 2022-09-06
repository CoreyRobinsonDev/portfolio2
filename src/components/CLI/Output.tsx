import { get, History } from "../../util/helper";
import styles from "../../modules/CLI/Output.module.css";

const Output = () => {
  const history: History[] = get("history")?.reverse();

  return <>
    {
      history?.map((line, key) => <span className={styles.container} key={key}>
        <span className={styles.line}>
          <p className={styles.line__path}>{line.path?.join("/")}</p>
          <p className={styles.line__command}>$ {line?.command.trim()}</p>
        </span>
        {line?.command.trim() === "help"
          ? line.output?.map((item, key2) => <span className={styles.output__help} key={key2}><p>{item[0]}</p><p>{item[1]}</p></span>)
          : line.output?.map((item, key2) => <p className={styles.output} key={key2}>{item}</p>)
        }
        {line.output[0] === "" ? "" : <br/>}
      </span>)
    }
  </>
}
export default Output;