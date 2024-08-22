import Link from "next/link";
import styles from "./actions.module.css";
import { PostData } from "@/interfaces/I_Post";

type Props = {
  post: PostData;
};

function Actions(props: Props) {
  const { post } = props;

  return (
    <div className={styles.actionContainer}>
      <Link className={styles.link} href={`/blog/edit/${post.slug}`}>
        Edit
      </Link>
    </div>
  );
}

export default Actions;
