import { FormInfo } from "@/interfaces/I_Post";
import { authOptions } from "@/lib/authOptions";
import { Post, User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { Error } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type PostProps = {
  title: string;
  slug: string;
  categories: string;
  desc: string;
  userId: string;
  content: string;
};

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  try {
    connectToDb();

    const category = req.nextUrl.searchParams.get("category");

    let query = {};
    if (category) {
      query = { categories: { $in: [category] } };
    }

    // 檢查是否有登入
    if (currentUser?.isAdmin) {
      // 管理員可以看到所選擇的category的所有文章
    } else {
      query = {
        ...query,
        requiredRoles: { $in: ["user"] },
      };
    }

    const posts = await Post.find(query);

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Posts!");
  }
}

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  const currentUser = session?.user;
  if (!currentUser) {
    return NextResponse.json("Unauthorized");
  }

  const body: FormInfo = await req.json();
  const { title, slug, categories, desc, content, adminOnly } = body;

  if (!title || !slug || !categories || !desc || !content) {
    return NextResponse.json("Missing required fields");
  }

  try {
    connectToDb();

    const foundUser = await User.findOne({ email: currentUser.email });
    if (!foundUser) return NextResponse.json("DB User not found");

    const newPost = new Post({
      title,
      slug,
      categories: categories.length > 0 ? categories : ["others"],
      desc,
      userId: foundUser._id,
      content,
      requiredRoles: adminOnly ? ["admin"] : ["user"],
    });

    await newPost.save();
    return NextResponse.json({
      status: "SUCCESS",
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
