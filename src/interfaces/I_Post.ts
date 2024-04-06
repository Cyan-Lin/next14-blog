interface PostData {
  _id: string;
  title: string;
  desc: string;
  img: string;
  userId: string;
  slug: string;
  categories: string[];
  content: string;
  createdAt: Date;
}

export type { PostData };
