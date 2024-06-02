import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    slug: string;
  };
};

export const GET = async (_: any, { params }: Props) => {
  const { slug } = params;
  try {
    connectToDb();

    const post = await Post.findOne({ slug });
    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch post!");
  }
};

export const PUT = async (req: NextRequest, { params }: Props) => {
  const { slug } = params;
  try {
    connectToDb();

    const data = await req.json();

    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      {
        $set: {
          title: data.title,
          categories: data.categories,
          desc: data.desc,
          content: data.content,
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json("Post not found!", { status: 404 });
    }

    return NextResponse.json({
      status: "success",
      message: "Post updated!",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update post!");
  }
};

export const DELETE = async (_: any, { params }: Props) => {
  const { slug } = params;
  try {
    connectToDb();

    await Post.deleteOne({ slug });
    return NextResponse.json("Post deleted!");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete post!");
  }
};
