import Image from "next/image";
import styles from "./postUser.module.css";
import { getUser } from "@/lib/data";

type Props = {
  userId: string;
};

// FETCH DATA WITH API
// const getUserInfo = async (userId: number): Promise<UserInfo> => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${userId}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     throw new Error("getUserInfo Fail");
//   }

//   return res.json();
// };

async function PostUser({ userId }: Props) {
  const userInfo = await getUser(userId);

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={userInfo?.img || "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      />

      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{userInfo?.username}</span>
      </div>
    </div>
  );
}

export default PostUser;
