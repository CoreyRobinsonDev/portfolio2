import { useState } from "react";
import styles from "../modules/Project.module.css";
import fx from "../modules/FX.module.css";

type Props = {
  project:   {
    title: string,
    img: string,
    gif: string,
    site: string,
    code: string,
    description: string,
    tech: {
      frontend: string[],
      backend: string[],
      tools: string[]
    }
  }
}

const Project:React.FC<Props> = ({project}) => {
  const [onHover, setOnHover] = useState(false);
  const mainClass = project.title === "Stonks" ? "--main" : "";
 
  return <a className={`${styles.container} ${styles[mainClass]}`} href={project.site} target="_blank" rel="noreferrer" onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
    <img className={styles.img} src={onHover ? project.gif : project.img} alt="" />
    <main className={styles.info_container}>
      <h2 className={`${styles.title} ${styles["title" + mainClass]}`}>{project.title}</h2>
      <p className={styles.description}>{project.description}</p>
    </main>
    <div className={styles.tech_container}>
      <h3 className={`${styles.tech_title} ${styles["tech_title" + mainClass]}`}>Technologies</h3>
      <div className={styles.tech__frontend}>
        <p>Front-End</p>
        <ul>
          {project.tech.frontend.map((tech, key) => <li key={key}>{tech}</li>)}  
        </ul>
      </div>
      {project.tech.backend.length > 0 && <div className={styles.tech__backend}>
        <p>Back-End</p>
        <ul>
          {project.tech.backend?.map((tech, key) => <li key={key}>{tech}</li>)}
        </ul>
      </div>}
      <div className={styles.tech__tools}>
        <p>Tools</p>
        <ul>
          {project.tech.tools.map((tech, key) => <li key={key}>{tech}</li>)}
        </ul>
      </div>
    </div>
    <div className={styles.link_container}>
      <a className={fx.hover} href={project.site} target="_blank" rel="noreferrer">View Site</a>
      <a className={fx.hover} href={project.code} target="_blank" rel="noreferrer">View Code</a>
    </div>
  </a>
}
export default Project;