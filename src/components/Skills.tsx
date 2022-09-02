import styles from "../modules/Skills.module.css";

const Skills = () => {
  return <section className={styles.container}>
    <div className={styles.skills_container}>
    <div>
      <h3 className={styles.skills_title}>Front-End</h3>
      <ul className={styles.list}>
        <li>
          <ul className={styles.sub_tech}>
            <li className={styles.tech_title}>React</li>
            <li>React-Router</li>
            <li>React-Icons</li>
            <li>React-Spring</li>
            <li>Framer Motion</li>
          </ul>
        </li>
        <li>
          <ul className={styles.sub_tech}>
            <li className={styles.tech_title}>Redux</li>
            <li>React-Redux</li>
            <li>Redux-Toolkit</li>
          </ul>
        </li>
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Styled Components</li>
        <li>Emotion CSS</li>
        <li>jQuery</li>
        <li>Jest</li>
        <li>Bootstrap</li>
      </ul>
    </div>
    <div>
      <h3 className={styles.skills_title}>Back-End</h3>
      <ul className={styles.list}>
        <li>
          <ul className={styles.sub_tech}>
            <li className={styles.tech_title}>NodeJS</li>
            <li>ExpressJS</li>
            <li>PassportJS</li>
          </ul>
        </li>
        <li>REST APIs</li>
        <li>MongoDB</li>
        <li>SQLite</li>
        <li>
          <ul className={styles.sub_tech}>
            <li className={styles.tech_title}>Python</li>
            <li>Flask</li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <h3 className={styles.skills_title}>Dev</h3>
      <ul className={styles.list}>
        <li>Git</li>
        <li>TDD</li>
        <li>BEM</li>
        <li>Linux</li>
        <li>Vim</li>
      </ul>
    </div>
    </div>
    <h2 className={styles.title_container}><span className={styles.title}>Skills</span></h2>
  </section>
}
export default Skills;