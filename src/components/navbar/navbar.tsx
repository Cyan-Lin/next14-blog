import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { auth } from "@/lib/auth";

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
      <Link href={"/"} className={styles.logo}>
        Logo
      </Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
}

export default Navbar;
