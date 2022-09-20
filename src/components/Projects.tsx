import Project from "./Project";
import styles from "../modules/Projects.module.css";

export const projects = [
  {
    title: "Stonks",
    img: "pics/stonks-pic.webp",
    gif: "gifs/stonks-gif.gif",
    site: "https://stonks-crd.netlify.app/",
    code: "https://github.com/CoreyRobinsonDev/stonks",
    description: "Simple stock exchange where users can create an account to buy and sell stocks. Once assets are bought users can see their portfolio in a doughnut chart aswell as their transaction history. Users can also quote stocks and get news articles on a given company.",
    tech: {
      frontend: ["React", "React-Router", "React-Icons", "TypeScript", "Redux", "CSS"],
      backend: ["NodeJS", "ExpressJS", "PassportJS", "Bcrypt", "TypeScript", "SQLite"],
      tools: ["Polygon.io API"]
    }
  },
  {
    title: "Chess Openings",
    img: "pics/chess-openings-pic.webp",
    gif: "gifs/chess-openings-gif.gif",
    site: "https://chess-openings-crd.netlify.app/",
    code: "https://github.com/CoreyRobinsonDev/chess-openings",
    description: "A web app designed to show and analyze a given chess position while providing top Masters games in that position. This is done using the Lichess opening explorer database and the Lichess cloud evaluations database.",
    tech: {
      frontend: ["React", "Redux", "CSS"],
      backend: [],
      tools: ["Lichess API"]
    }
  },
  {
    title: "Mars Gallery",
    img: "pics/mars-gallery-pic.webp",
    gif: "gifs/mars-gallery-gif.gif",
    site: "https://mars-gallery-crd.netlify.app/",
    code: "https://github.com/CoreyRobinsonDev/mars-gallery",
    description: "A simple web app for searching photos taken on Mars using NASA's Mars Rover Photos api.",
    tech: {
      frontend: ["React", "TypeScript", "Emotion"],
      backend: [],
      tools: ["NASA Mars Rover API"]
    }
  }
]

const Projects = () => {
  return <section className={styles.container}>
    <div className={styles.projects}>
      {projects.map((project, key) => <Project key={key} project={project} />)}
    </div>
  </section>
}

export default Projects;