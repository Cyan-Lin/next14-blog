"use server";

import { connectToDb } from "./utils";
import { Post } from "./models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addPost = async (formData: FormData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();

    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};

// 未使用
export const handleGithubLogin = async () => {
  // await signIn("github", {
  //   redirectTo: "/blog",
  // });

  window.location.href = "/api/auth/signin";
  // signIn("github", { redirectTo: "/blog" });
};

// 未使用
export const handleGithubLogout = async () => {
  cookies().delete("user");
  // await signOut({ redirectTo: "/login" });
};
