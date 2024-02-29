import { Metadata } from "next/types";
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
// import { PostData } from "@/interfaces/I_Post";
import { getPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog Page",
  description: "This is my blog",
};

// FETCH DATA WITH API
// const getData = async (): Promise<PostData[]> => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");

//   if (!res.ok) {
//     throw new Error("getData error");
//   }

//   return res.json();
// };

async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default BlogPage;
