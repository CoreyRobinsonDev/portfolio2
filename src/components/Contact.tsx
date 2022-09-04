import styles from "../modules/Contact.module.css";
import FX from "../modules/FX.module.css";

const Contact = () => {
  return <section className={styles.container}>
    <form className={styles.form} name="contact" method="POST" data-netlify="true">
      <a className={`${styles.link} ${FX.hover}`} href="../../../frontend_resume.pdf" target="_blank">Resume</a>
      <input type="hidden" name="form-name" value="contact" />
      <input className={styles.form__name} type="text" name="name" placeholder="Name" required />
      <input className={styles.form__email} type="email" name="email" placeholder="Email" required />
      <textarea className={styles.form__message} name="message" placeholder="Message..." required />
      <input className={`${styles.form__submit} ${FX.hoverCorner}`} type="submit" value="Send" />
    </form>
    <h2 className={styles.title_container}><span className={styles.title}>Contact</span></h2>
  </section>
}
export default Contact;