import BlogForm from "@/components/blog/edit/blogForm/blogForm";
import { PostData } from "@/interfaces/I_Post";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

async function EditPage({ params }: Props) {
  const { slug } = params;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const getPost = async (): Promise<PostData> => {
    const res = await fetch(`${process.env.MAIN_API_DOMAIN}/api/blog/${slug}`, {
      cache: "no-store",
    });
    return res.json();
  };

  const post = await getPost();

  return (
    <>
      <BlogForm postData={post} />
    </>
  );
}

export default EditPage;
