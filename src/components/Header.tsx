import { useState, useEffect } from "react";
import styles from "../modules/Header.module.css";
import FX from "../modules/FX.module.css";

const Header = () => {
  const [sticky, setSticky] = useState("");
  // on render, set listener
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);
  
  const isSticky = () => {
    const header = document.getElementById("header");
    if (!header) return;
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= header.offsetTop ? styles.sticky : "";
    setSticky(stickyClass);
  };

  return <header id="header" className={`${styles.container}`}>
    <nav>
      <ul className={`${styles.list} ${sticky}`}>
        <li><a className={`${styles.link} ${FX.allsides}`} href="#about">About</a></li>
        <li><a className={`${styles.link} ${FX.allsides}`} href="#projects">Projects</a></li>
        <li><a className={`${styles.link} ${FX.allsides}`} href="#skills">Skills</a></li>
        <li><a className={`${styles.link} ${FX.allsides}`} href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
}
export default Header;