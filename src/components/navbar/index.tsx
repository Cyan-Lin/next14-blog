import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { auth } from "@/lib/auth";
import Image from "next/image";

async function Navbar() {
  const session = await auth();

  // const getCurrentUser = async () => {
  // const res = await fetch(
  //   `${process.env.MAIN_API_DOMAIN}/api/auth/user/${session?.user?.email}`
  // );
  // const data = await res.json();

  // console.log("data", data);
  // };

  // if (session?.user?.email) await getCurrentUser();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href={"/"}>
          <Image src="/logo.png" alt="" fill />
        </Link>
      </div>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
}

export default Navbar;
