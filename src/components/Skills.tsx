import styles from "../modules/Skills.module.css";

const Skills = () => {
  const frontend = ["React", "Redux", "HTML", "CSS", "JavaScript", "TypeScript"];
  const backend = ["Nextjs","Node", "Express",  "SQLite"];
  const dev = ["Git", "Bash", "Vim"];

  return <section className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.title}>Front-End</h2>
      {frontend.map((skill, key) => <article className={styles.skill__container} key={key}>
        <img src={`/pics/skills/${skill.toLowerCase()}.webp`} alt={skill} />
        <h3>{skill}</h3>
      </article>)}
    </div>
    <div className={styles.card}>
      <h2 className={styles.title}>Back-End</h2>
      {backend.map((skill, key) => <article className={styles.skill__container} key={key}>
        <img src={`/pics/skills/${skill.toLowerCase()}.webp`} alt={skill} />
        <h3>{skill}</h3>
      </article>)}
    </div>
    <div className={styles.card}>
      <h2 className={styles.title}>Dev</h2>
      {dev.map((skill, key) => <article className={styles.skill__container} key={key}>
        <img src={`/pics/skills/${skill.toLowerCase()}.webp`} alt={skill} />
        <h3>{skill}</h3>
      </article>)}
    </div>
  </section>
}
export default Skills;