import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    email: string;
  };
};

const GET = async (_: NextRequest, { params }: Props) => {
  try {
    connectToDb();
    const currentUser = await User.findOne({ email: params.email });
    return NextResponse.json(currentUser);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user");
  }
};

export { GET };
