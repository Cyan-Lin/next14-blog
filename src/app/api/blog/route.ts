import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
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
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Posts!");
  }
};

export const POST = async (req: NextRequest) => {
  const body: PostProps = await req.json();
  const { title, slug, categories, desc, userId, content } = body;

  if (!title || !slug || !categories || !desc || !userId || !content) {
    return NextResponse.json("Missing required fields");
  }

  try {
    connectToDb();

    const newPost = new Post({
      title,
      slug,
      categories,
      desc,
      userId,
      content,
    });

    await newPost.save();
    return NextResponse.json("Post created!");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch post!");
  }
};
