import styles from "./singlePostPage.module.css";
import PostUser from "@/components/postUser/postUser";
import { PostData } from "@/interfaces/I_Post";
import { Suspense } from "react";
// import Markdown from "markdown-to-jsx";
import CustomMarkdown from "@/components/markdown/customMarkdown";

type Props = {
  params: {
    slug: string;
  };
};

// FETCH DATA WITH API
const getSinglePost = async (slug: string): Promise<PostData> => {
  const res = await fetch(`${process.env.MAIN_API_DOMAIN}/api/blog/${slug}`, {
    cache: "no-store",
  });

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

// const markdown = `
// # 標題 1
// ## 標題 2
// ### 標題 3
// #### 標題 4
// ##### 標題 5
// ###### 標題 6

// 段落之間需要留一個空行。這樣可以讓 Markdown 正確識別段落。

// 這是一個段落。

// 這是另一個段落。

// - *斜體*
// - **粗體**
// - ***粗斜體***

// - 項目 1
// - 項目 2
//   - 子項目 2.1
//   - 子項目 2.2

// 1. 第一項
// 2. 第二項
//    1. 子項 2.1
//    2. 子項 2.2

//    [訪問 Google](https://www.google.com)

//    ![Markdown Logo](https://markdown-here.com/img/icon256.png)

//    > 這是一個引用的例子。

//    這是一段行內代碼
//    \`\`\`
//    console.log("Hello, World!");
//    \`\`\`

//   \`\`\`
// function hello() {
//     console.log('Hello, World!');
// }
// \`\`\`

// ---

// | 標題 1 | 標題 2 | 標題 3 |
// | ------ | ------ | ------ |
// | 內容 1 | 內容 2 | 內容 3 |
// | 內容 3 | 內容 4 | 內容 5 |
// `;

async function SinglePostPage({ params }: Props) {
  const { slug } = params;

  const post = await getSinglePost(slug);

  return (
    <div className={styles.container}>
      {/* {post?.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )} */}
      <div className={styles.textContainer}>
        <CustomMarkdown>{`# ${post.title}`}</CustomMarkdown>
        <CustomMarkdown>{`## ${post.desc}`}</CustomMarkdown>
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
        <CustomMarkdown>{post.content}</CustomMarkdown>
        {/* <CustomMarkdown>{markdown}</CustomMarkdown> */}
      </div>
    </div>
  );
}

export default SinglePostPage;
