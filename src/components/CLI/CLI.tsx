import styles from "../../modules/CLI.module.css";
import Input from "./Input";
import Output from "./Output";
import Path from "./Path";

const CLI = () => {
  return <section className={styles.container}>
    <span className={styles.footer}>
      <Path />
      <Input />
    </span>
    <Output/>
  </section>
}
export default CLI;