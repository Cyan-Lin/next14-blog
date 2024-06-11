import BlogForm from "@/components/blog/edit/blogForm/blogForm";
import { PostData } from "@/interfaces/I_Post";

type Props = {
  params: {
    slug: string;
  };
};

async function EditPage({ params }: Props) {
  const { slug } = params;

  const getPost = async (): Promise<PostData> => {
    const res = await fetch(`${process.env.MAIN_API_DOMAIN}/api/blog/${slug}`, {
      cache: "no-store",
    });
    return res.json();
  };

  const post = await getPost();

  console.log("post", post);

  return (
    <>
      <BlogForm postData={post} />
    </>
  );
}

export default EditPage;
