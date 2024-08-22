import { Category } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

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
