import styles from "../../modules/CLI/CLI.module.css";
import Input from "./Input";
import Output from "./Output";

const CLI = () => {
  return <section className={styles.container}>
    <Input />
    <Output/>
  </section>
}
export default CLI;