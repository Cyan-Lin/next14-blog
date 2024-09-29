// import { auth } from "@/auth";
import BlogForm from "@/components/blog/edit/blogForm/blogForm";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function NewPostEditPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return <BlogForm />;
}

export default NewPostEditPage;
