import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import Image from "next/image";

async function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href={"/"}>
          <Image src="/logo.png" alt="" fill />
        </Link>
      </div>
      <div>
        <Links />
      </div>
    </div>
  );
}

export default Navbar;
