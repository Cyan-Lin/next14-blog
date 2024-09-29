import { FormInfo } from "@/interfaces/I_Post";
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

    const body: FormInfo = await req.json();
    const { title, categories, desc, content, adminOnly } = body;

    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      {
        $set: {
          title: title,
          categories: categories.length > 0 ? categories : ["others"],
          desc: desc,
          content: content,
          requiredRoles: adminOnly ? ["admin"] : ["user"],
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json("Post not found!", { status: 404 });
    }

    return NextResponse.json({
      status: "SUCCESS",
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
