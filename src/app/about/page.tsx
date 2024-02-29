import Image from "next/image";
import styles from "./about.module.css";

function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          We create digital ideas that are bigger, bolder, braver and better.
        </h1>
        <p className={styles.desc}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Tear of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Tear of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Tear of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image className={styles.img} src="/about.png" alt="about" fill />
      </div>
    </div>
  );
}

export default AboutPage;
