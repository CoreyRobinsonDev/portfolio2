import styles from "../modules/About.module.css";
import { about } from "../info/text";
import FX from "../modules/FX.module.css";

const About = () => {
  return <section className={styles.container}>
    <div className={styles.about_section}>
      <p>Hi, I'm <span>Corey Robinson</span></p>
      <p>{about}</p>
      <div className={styles.link_container}>
        <a className={FX.hover} href="https://github.com/CoreyRobinsonDev" target="_blank" rel="noreferrer">Github</a>
        <a className={FX.hover} href="https://www.linkedin.com/in/coreycodes/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </div>
    <h2 className={styles.title_container}><span className={styles.title}>About</span></h2>
  </section>
}

export default About;