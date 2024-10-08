interface PostData {
  _id: string;
  title: string;
  desc: string;
  img: string;
  userId: string;
  slug: string;
  categories: string[];
  content: string;
  requiredRoles: string[];
  createdAt: Date;
}

type FormInfo = {
  title: string;
  slug: string;
  categories: string[];
  desc: string;
  content: string;
  adminOnly: boolean;
};

type SavePostRequest = {
  title: string;
  slug: string;
  categories: string[];
  desc: string;
  content: string;
  adminOnly: boolean;
};

type UpdatePostRequest = {
  title: string;
  categories: string[];
  desc: string;
  content: string;
  adminOnly: boolean;
};

type PostCategory = {
  key: string;
  name: string;
};

export type {
  PostData,
  FormInfo,
  SavePostRequest,
  UpdatePostRequest,
  PostCategory,
};
