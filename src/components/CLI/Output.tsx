import { get, History } from "../../util/helper";
import { nameAscii, titleAscii, introAscii } from "../../info/ascii";
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
        {line?.command === "cat skills.txt" && line.output?.map((item, key2) => <span className={styles.output__cat} key={key2}><p>{item?.[0]}</p><p>{item?.[1]}</p><p>{item?.[2]}</p></span>)}
        {line?.command.includes("contact") && line.output?.map((item, key2) => <form key={key2} className={styles.form} name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
      <input className={styles.form__name} type="text" name="name" placeholder="Name" value={item[0]} required />
      <input className={styles.form__email} type="email" name="email" placeholder="Email" value={item[1]} required />
      <textarea className={styles.form__message} name="message" placeholder="Message..." value={item[2]} required />
      <input className={`${styles.form__submit}`} type="submit" value="Send" />
        </form>)}
        {(line?.command !== "help" && line?.command !== "intro" && line?.command !== "cat skills.txt" && !line?.command.includes("contact")) && line.output?.map((item, key2) => <p className={styles.output} key={key2}>{item}</p>)}
        {line.output[0] === "" ? "" : <br/>}
      </span>)
    }
    </div>
  </section>
}
export default Output;