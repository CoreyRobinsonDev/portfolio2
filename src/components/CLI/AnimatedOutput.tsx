import { motion } from "framer-motion";
import { get, History } from "../../util/helper";
import styles from "../../modules/CLI/Output.module.css";

const AnimatedOutput = () => {
  const historyArr: History[] = get("history");
  const line: History | undefined = historyArr?.pop();
  const specialCommands = ["help", "info", "cat skills.txt", "goto", "contact"];

  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: {staggerChildren: 0.05}
    })
  }

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        velocity: 3,
        stiffness: 200
      }
    },
    hidden: {
      opacity: 0,
      x: "-20ch",
      transition: {
        type: "spring",
        velocity: 3,
        stiffness: 200
      }
    }
  }

  return <>
    {line && <>
      <span className={styles.line}>
      <p className={styles.line__path}>{line?.path.join("/")}</p>
      <p className={styles.line__command}>$ {line?.commandStr}</p>
    </span>
    {line?.command === "help" && line?.output?.map((item, key2) => <span className={styles.output__help} key={key2}>
      <motion.p variants={container} initial="hidden" animate="visible">{item[0].split("").map(ch => <motion.span variants={child}>{ch}</motion.span>)}</motion.p>
      <motion.p variants={container} initial="hidden" animate="visible">{item[1].split("").map(ch => <motion.span variants={child}>{ch}</motion.span>)}</motion.p></span>)}
    {line?.command === "info" && line?.output?.map((item, key2) => <pre key={key2} className={styles.ascii__intro}><code>{item}</code></pre>)}
      {line?.command === "goto" && line.output?.map((item, key2) => <motion.a className={styles.output__link} variants={container} initial="hidden" animate="visible" key={key2} href={`https://${item}-crd.netlify.app`} target="_blank" rel="noreferrer">{item.split("").map(ch => <motion.span variants={child}>{ch}</motion.span>)}</motion.a>)}
    {line?.commandStr === "cat skills.txt" && line.output?.map((item, key2) => <span className={styles.output__cat} key={key2}>
      <motion.p variants={container} initial="hidden" animate="visible">{item?.[0]?.split("").map(ch => <motion.span variants={child}>{ch}</motion.span>)}</motion.p>
      <motion.p variants={container} initial="hidden" animate="visible">{item?.[1]?.split("").map(ch => <motion.span variants={child}>{ch}</motion.span>)}</motion.p>
      <motion.p variants={container} initial="hidden" animate="visible">{item?.[2]?.split("").map(ch => <motion.span variants={child}>{ch}</motion.span>)}</motion.p>
    </span>)}
    {line?.command.includes("contact") && line.output?.map((item, key2) => <motion.form variants={container} initial="hidden" animate="visible" key={key2} className={styles.form} name="contact" method="POST" data-netlify="true">
      <motion.input variants={child} type="hidden" name="form-name" value="contact" />
      <motion.input variants={child} className={styles.form__name} type="text" name="name" placeholder="Name" value={item[0]} required />
      <motion.input variants={child} className={styles.form__email} type="email" name="email" placeholder="Email" value={item[1]} required />
      <motion.textarea variants={child} className={styles.form__message} name="message" placeholder="Message..." value={item[2]} required />
      <motion.input variants={child} className={`${styles.form__submit}`} type="submit" value="Send" />
    </motion.form>)}
    {(!specialCommands.includes(line?.command) && !specialCommands.includes(line?.commandStr)) && line?.output?.map((item, key2) => <motion.p variants={container} initial="hidden" animate="visible"className={styles.output} key={key2}>{item?.split("").map(ch => <motion.span variants={child}>{ch}</motion.span>)}</motion.p>)}
    {line?.output[0] === "" ? "" : <br/>}
    </>}
  </>
}
export default AnimatedOutput;