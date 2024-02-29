import Image from "next/image";
import Link from "next/link";
import styles from "./postCard.module.css";
import { PostData } from "@/interfaces/I_Post";

type Props = {
  post: PostData;
};

function PostCard({ post }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          {post.img && (
            <Image src={post.img} alt="" fill className={styles.img} />
          )}
        </div>
        <div className={styles.date}>2024.01.01</div>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.desc}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
