import { PostData } from "@/interfaces/I_Post";
import { connectToDb } from "./utils";
import { Post } from "./models";

export const addPost = async (formData: FormData) => {
  "use server";

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
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};
