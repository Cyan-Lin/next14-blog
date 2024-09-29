import { PostCategory } from "@/interfaces/I_Post";
import { Category } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();

    const categories = await Category.find({});

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch categories");
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    connectToDb();

    // 從請求中獲取新的 categories 資料
    const newCategories: PostCategory[] = await req.json();
    if (!newCategories || !Array.isArray(newCategories)) {
      return NextResponse.json(
        { error: "Invalid categories data" },
        { status: 400 }
      );
    }

    // 清空現有的 categories 資料
    await Category.deleteMany({});

    // 插入新的 categories 資料
    await Category.insertMany(newCategories);

    return NextResponse.json({ message: "SUCCESS" });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to PUT categories");
  }
};
