import { AiFillGithub } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";

import styles from "../modules/About.module.css";
import { about } from "../info/text";

const About = () => {
  return <section id="about" className={styles.container}>
    <div className={styles.about_section}>
        <div className={styles.content}>
          <h2>A little about me...</h2>
          <p>{about}</p>
        </div>
        <a className={`${styles.link__github} ${styles.link}`} href="https://github.com/CoreyRobinsonDev" target="_blank" rel="noreferrer"><AiFillGithub className={styles.icon__github} /><p>GitHub</p></a>
        <a className={`${styles.link__linkedin} ${styles.link}`} href="https://www.linkedin.com/in/coreycodes/" target="_blank" rel="noreferrer"><BsLinkedin className={styles.icon__linkedin} /><p>LinkedIn</p></a>
    </div>
  </section>
}

export default About;