import styles from "../modules/Footer.module.css";

const Footer = () => {
  return <footer className={styles.container}>
    <small>&copy; 2022 Corey Robinson</small>
    <small>
      <a className={styles.link} href="https://github.com/coreyrobinsondev/portfolio2" target="_blank" rel="noreferrer">{"<view code>"}</a>
    </small>
  </footer>
}
export default Footer;