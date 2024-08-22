import Link from "next/link";
import styles from "./postCard.module.css";
import { PostCategory, PostData } from "@/interfaces/I_Post";
import dynamic from "next/dynamic";
const Actions = dynamic(() => import("./actions/actions"), {
  ssr: false,
});

type Props = {
  post: PostData;
};

function PostCard({ post }: Props) {
  const parseDateTime = (isoString: Date) => {
    const date = new Date(isoString);
    const dateTime = new Intl.DateTimeFormat().format(date);
    return dateTime;
  };

  return (
    <div className={styles.container}>
      <Link className={styles.link} href={`/blog/${post.slug}`}>
        {/* <div className={styles.top}>
          <div className={styles.imgContainer}>
            {post.img && (
              <Image src={post.img} alt="" fill className={styles.img} />
            )}
          </div>
        </div> */}
        <div className="left">
          <div className="user-container"></div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.desc}>{post.desc}</p>
          <div className={styles.cardFooter}>
            <div className={styles.date}>{parseDateTime(post.createdAt)}</div>
            {/* <Link className={styles.link} href={`/blog/edit/${post.slug}`}>
              Edit
            </Link> */}
          </div>
        </div>
        <div className={styles.right}></div>
      </Link>
      <div className={styles.actions}>
        <Link className={styles.link} href={`/blog/edit/${post.slug}`}>
          Edit
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
