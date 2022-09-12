import styles from "../modules/Header.module.css";

const Header = () => {
  return <header className={styles.container}>
    <h1 className={styles.name}>Corey <span className={styles.lastName}>Robinson</span></h1>
    <p className={styles.title}>Web Developer</p>
  </header>
}
export default Header;