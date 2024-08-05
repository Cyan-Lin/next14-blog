import styles from "./footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>cyan-dev-journal</div>
      <div className={styles.text}>© 2024 by Cyan. All rights reserved.</div>
    </div>
  );
}

export default Footer;
