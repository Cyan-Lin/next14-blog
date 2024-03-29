import Image from "next/image";
import styles from "./singlePostPage.module.css";
import PostUser from "@/components/postUser/postUser";
import { PostData } from "@/interfaces/I_Post";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

type Props = {
  params: {
    slug: string;
  };
};

// FETCH DATA WITH API
const getSinglePost = async (slug: string): Promise<PostData> => {
  const res = await fetch(`${process.env.MAIN_API_DOMAIN}/api/blog/${slug}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = params;

  const post = await getSinglePost(slug);

  return {
    title: post?.title,
    description: post?.desc,
  };
};

async function SinglePostPage({ params }: Props) {
  const { slug } = params;

  const post = await getSinglePost(slug);

  return (
    <div className={styles.container}>
      {post?.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post?.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {new Intl.DateTimeFormat().format(new Date(post?.createdAt))}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post?.desc}</div>
      </div>
    </div>
  );
}

export default SinglePostPage;
