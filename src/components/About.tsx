import styles from "../modules/About.module.css";
import FX from "../modules/FX.module.css";

const About = () => {
  return <section className={styles.container}>
    <div className={styles.about_section}>
      <p>Hi, I'm <span>Corey Robinson</span></p>
      <p>I'm a logical and results-driven developer dedicated to building and optimizing user-focused websites. Currently switching industries, I'm very interested and passionate about everything related to computers. I'm a lifelong learner who stays up to date on the latest technologies and is excited to try new things.</p>
      <div className={styles.link_container}>
        <a className={FX.hover} href="https://github.com/CoreyRobinsonDev" target="_blank" rel="noreferrer">Github</a>
        <a className={FX.hover} href="https://www.linkedin.com/in/coreycodes/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </div>
    <h2 className={styles.title_container}><span className={styles.title}>About</span></h2>
  </section>
}

export default About;