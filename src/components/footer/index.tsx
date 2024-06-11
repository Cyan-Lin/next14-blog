import styles from "./footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>cyans-blog</div>
      <div className={styles.text}>Copyright © by Cyan Lin.</div>
    </div>
  );
}

export default Footer;
