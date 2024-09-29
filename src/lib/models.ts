import { PostCategory, PostData } from "@/interfaces/I_Post";
import { UserInfo } from "@/interfaces/I_User";
import { Model, Schema, model, models } from "mongoose";

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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    content: {
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
    requiredRoles: {
      type: [String],
      default: ["user"],
    },
  },
  {
    timestamps: true,
  }
);

const categorySchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User =
  (models.User as Model<UserInfo>) || model<UserInfo>("User", userSchema);
const Post =
  (models.Post as Model<PostData>) || model<PostData>("Post", postSchema);
const Category =
  (models.Category as Model<PostCategory>) || model("Category", categorySchema);

export { User, Post, Category };
