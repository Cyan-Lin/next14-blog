import { unstable_noStore as noStore } from "next/cache";
import { PostData } from "@/interfaces/I_Post";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { UserInfo } from "@/interfaces/I_User";

// TEMPORARY DATA
// const users = [
//   { id: "1", name: "J" },
//   { id: "2", name: "Q" },
// ];

// const posts = [
//   { id: "1", title: "Post 1", body: "this is body 1", userId: "1" },
//   { id: "2", title: "Post 2", body: "this is body 2", userId: "1" },
//   { id: "3", title: "Post 3", body: "this is body 3", userId: "2" },
//   { id: "4", title: "Post 4", body: "this is body 4", userId: "2" },
// ];

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = Post.find();
    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug: string): Promise<PostData | null> => {
  try {
    connectToDb();
    const post = Post.findOne({ slug });
    return post;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch post!");
  }
};

export const getCurrentUser = async (
  email: string
): Promise<UserInfo | null> => {
  noStore();
  try {
    connectToDb();
    const user = User.findOne({ email });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user!");
  }
};

export const getUser = async (id: string): Promise<UserInfo | null> => {
  noStore();
  try {
    connectToDb();
    const user = User.findById({ _id: id });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = User.find();
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users!");
  }
};
