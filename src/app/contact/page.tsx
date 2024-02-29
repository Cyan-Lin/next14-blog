"use client";
import Image from "next/image";
import styles from "./contact.module.css";

function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image priority className={styles.img} src="/contact.png" alt="" fill />
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="First Name and Last Name" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea cols={30} rows={10} placeholder="message"></textarea>
          <button onClick={() => console.log("clicked event")}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
