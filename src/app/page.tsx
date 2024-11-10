import styles from "./home.module.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.desc}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brands}>
          {/* <Image src="/brands.png" alt="" fill className={styles.brandImg} /> */}
        </div>
      </div>
      <div className={styles.imgContainer}>
        {/* <Image src="/hero.gif" alt="" fill className={styles.heroImg} /> */}
      </div>
    </div>
  );
}

export default HomePage;
