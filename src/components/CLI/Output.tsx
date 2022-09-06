import { get, History } from "../../util/helper";
import { nameAscii, titleAscii, introAscii } from "../../util/ascii";
import styles from "../../modules/CLI/Output.module.css";

const Output = () => {
  const history: History[] = get("history");

  return <section>
    <div className={styles.ascii}>
      <pre className={styles.ascii__name}><code>{nameAscii}</code></pre>
      <pre className={styles.ascii__title}><code>{titleAscii}</code></pre>
      <pre className={styles.ascii__intro}><code>{introAscii}</code></pre>
    </div>
    <p className={styles.scroll}>Scroll Down to view Site</p>
    <div>
    {
      history?.map((line, key) => <span className={styles.container} key={key}>
        <span className={styles.line}>
          <p className={styles.line__path}>{line.path?.join("/")}</p>
          <p className={styles.line__command}>$ {line?.command}</p>
        </span>
        {line?.command === "help" && line.output?.map((item, key2) => <span className={styles.output__help} key={key2}><p>{item[0]}</p><p>{item[1]}</p></span>)}
        {line?.command === "intro" && line.output?.map((item, key2) => <pre key={key2} className={styles.ascii__intro}><code>{item}</code></pre>)}
        {(line?.command !== "help" && line?.command !== "intro") && line.output?.map((item, key2) => <p className={styles.output} key={key2}>{item}</p>)}
        {line.output[0] === "" ? "" : <br/>}
      </span>)
    }
    </div>
  </section>
}
export default Output;