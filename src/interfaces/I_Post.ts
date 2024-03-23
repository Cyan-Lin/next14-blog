interface PostData {
  _id: string;
  title: string;
  desc: string;
  img: string;
  userId: string;
  slug: string;
  createdAt: Date;
}

interface PostDetailData {
  userId: string;
  id: string;
  title: string;
  body: string;
  img: string;
}

export type { PostData, PostDetailData };
