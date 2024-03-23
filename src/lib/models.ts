import { PostData } from "@/interfaces/I_Post";
import { UserInfo } from "@/interfaces/I_User";
import { Model, Schema, model, models } from "mongoose";

// interface IUser {
//   username: string;
//   email: string;
//   password: string;
//   img: string;
//   isAdmin: boolean;
// }

// interface IPost {
//   title: string;
//   desc: string;
//   img: string;
//   userId: string;
//   slug: string;
// }

const userSchema = new Schema<UserInfo>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      // required: true,
      // min: 6,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new Schema<PostData>(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User =
  (models.User as Model<UserInfo>) || model<UserInfo>("User", userSchema);
export const Post =
  (models.Post as Model<PostData>) || model<PostData>("Post", postSchema);
