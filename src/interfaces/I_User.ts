interface UserInfo {
  username: string;
  email: string;
  password?: string;
  img: string;
  isAdmin: boolean;
  role: "user" | "admin";
}

export type { UserInfo };
