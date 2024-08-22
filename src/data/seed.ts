import { PostCategory } from "@/interfaces/I_Post";
import { Category } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

// 5. 定義要插入的資料
const categories: PostCategory[] = [
  { name: "React", key: "react" },
  { name: "Next.js", key: "next" },
  { name: "TypeScript", key: "ts" },
  { name: "JavaScript", key: "js" },
  { name: "CSS", key: "css" },
  { name: "MUI", key: "mui" },
  { name: "Tailwind", key: "tailwind" },
  { name: "Ant Design", key: "antd" },
];

// 6. 將資料插入 MongoDB
async function seedCategories() {
  try {
    await connectToDb();

    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany(categories);
      console.log("資料成功匯入");
    } else {
      console.log("已有 Category 資料, 跳過資料匯入");
    }
  } catch (error) {
    console.error("資料插入失敗", error);
  }
  // finally {
  //   // 關閉資料庫連線
  //   mongoose.connection.close();
  // }
}

export default seedCategories;
