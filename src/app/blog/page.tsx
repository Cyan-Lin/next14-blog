import { Metadata } from "next/types";
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { PostData } from "@/interfaces/I_Post";
import dynamic from "next/dynamic";
// import seedCategories from "@/data/seed";
import { getPostCategories } from "../domainApi/post";
import { headers } from "next/headers";
import { getQueryParamsString } from "@/helpers/common";
const PostFilter = dynamic(() => import("@/components/postFilter/postFilter"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Blog Page",
  description: "This is my blog",
};

// FETCH DATA WITH API
const getPosts = async (category?: string): Promise<PostData[]> => {
  const queryParamsString = getQueryParamsString([
    { key: "category", value: category },
  ]);

  const res = await fetch(
    `${process.env.MAIN_API_DOMAIN}/api/blog?${queryParamsString}`,
    {
      cache: "no-store",
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("getData error");
  }

  return res.json();
};

async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  // seedCategories();
  const posts = await getPosts(searchParams.category);
  const categories = await getPostCategories();

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts?.map((post) => (
          <div className={styles.post} key={post._id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>

      <PostFilter categories={categories} />
    </div>
  );
}

export default BlogPage;
