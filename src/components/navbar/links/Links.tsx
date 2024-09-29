"use client";

import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";

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

function Links() {
  const [open, setOpen] = useState(false);

  const { data: session, status: sessionStatus } = useSession();
  const { isAdmin } = session?.user || {};

  const renderLinksBySession = () => {
    if (sessionStatus === "loading") {
      return <div>Loading...</div>;
    }
    if (sessionStatus === "unauthenticated") {
      return <NavLink item={{ title: "Login", path: "/login" }} />;
    } else {
      return (
        session?.user && (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <button
              onClick={() => {
                Cookies.remove("user");
                signOut({ callbackUrl: "/login" });
              }}
              className={styles.logout}
            >
              Logout
            </button>
          </>
        )
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {renderLinksBySession()}
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
