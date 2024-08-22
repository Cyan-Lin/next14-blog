"use client";

import { useEffect, useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { handleGithubLogout } from "@/lib/action";
import { Session } from "next-auth";
import { UserInfo } from "@/interfaces/I_User";

type Props = {
  session: Session | null;
};

const links = [
  // {
  //   title: "Homepage",
  //   path: "/",
  // },
  // {
  //   title: "About",
  //   path: "/about",
  // },
  // {
  //   title: "Contact",
  //   path: "/contact",
  // },
  {
    title: "Blog",
    path: "/blog",
  },
];

function Links({ session }: Props) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserInfo>();

  const getCurrentUser = async () => {
    const res = await fetch(
      `${process.env.MAIN_API_DOMAIN}/api/auth/user/${session?.user?.email}`
    );
    const data = await res.json();

    setUser(data);
  };

  useEffect(() => {
    if (session?.user?.email) getCurrentUser();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleGithubLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src={"/menu.png"}
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Links;
