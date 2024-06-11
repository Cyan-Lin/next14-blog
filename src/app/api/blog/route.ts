import { auth } from "@/lib/auth";
import { Post, User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { Error } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type PostProps = {
  title: string;
  slug: string;
  categories: string;
  desc: string;
  userId: string;
  content: string;
};

export const GET = async () => {
  try {
    connectToDb();

    const posts = await Post.find();
    // console.log(posts);

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Posts!");
  }
};

export const POST = async (req: NextRequest) => {
  const body: PostProps = await req.json();
  const { title, slug, categories, desc, content } = body;

  if (!title || !slug || !categories || !desc || !content) {
    return NextResponse.json("Missing required fields");
  }

  try {
    connectToDb();

    const session = await auth();
    const currentUser = await User.findOne({ email: session?.user?.email });
    if (!currentUser) {
      return NextResponse.json("User not found");
    }

    const newPost = new Post({
      title,
      slug,
      categories,
      desc,
      userId: currentUser._id,
      content,
    });

    await newPost.save();
    return NextResponse.json({
      status: "success",
      message: "Post created!",
    });
  } catch (error: any) {
    if (error.name === "MongoServerError") {
      console.log(error);
      console.log(error.code);
      console.log(error.keyValue);

      return NextResponse.json({
        status: "error",
        message: "duplicate key error",
        data: [...Object.keys(error.keyValue)],
      });
    }
    return NextResponse.json("Something went wrong");
  }
};
