import { PostCategory } from "@/interfaces/I_Post";

const getPostCategories = async (): Promise<PostCategory[]> => {
  const res = await fetch(
    `${process.env.MAIN_API_DOMAIN}/api/blog/categories`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("getData error");
  }

  return res.json();
};

export { getPostCategories };
