import { Metadata } from "next/types";
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
// import { PostData } from "@/interfaces/I_Post";
import { PostData } from "@/interfaces/I_Post";

export const metadata: Metadata = {
  title: "Blog Page",
  description: "This is my blog",
};

// FETCH DATA WITH API
const getPosts = async (): Promise<PostData[]> => {
  const res = await fetch(`${process.env.MAIN_API_DOMAIN}/api/blog`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("getData error");
  }

  return res.json();
};

async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default BlogPage;
