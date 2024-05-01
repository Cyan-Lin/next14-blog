"use client";

import dynamic from "next/dynamic";
import styles from "./editor.module.css";
import Typography from "antd/es/typography";
import { Button, Input, Select, SelectProps } from "antd";

const MDXEditor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "278px 0 ",
        height: "calc(100vh - 600px)",
      }}
    >
      Loading...
    </div>
  ),
});

const markdown = ``;
// const markdown = `Hello **world**!`;

function EditorPage() {
  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  const handleSavePost = async () => {
    const res = await fetch(`${process.env.MAIN_API_DOMAIN}/api/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "title",
        slug: "slug",
        categories: ["category1", "category2"],
        desc: "desc",
        content: "content",
        userId: "65dd3e30370145fdac943f34",
      }),
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <form action="addPost">
        <div className={styles.inputContainer}>
          <Typography.Title level={5}>Title</Typography.Title>
          <Input showCount maxLength={20} placeholder="Title" />
        </div>
        <div className={styles.inputContainer}>
          <Typography.Title level={5}>Slug</Typography.Title>
          <Input showCount maxLength={20} placeholder="Slug" />
        </div>
        <div className={styles.inputContainer}>
          <Typography.Title level={5}>Categories</Typography.Title>
          <Select
            mode="multiple"
            size="large"
            placeholder="Please select Categories"
            defaultValue={["a10", "c12"]}
            onChange={handleChange}
            style={{ width: "100%" }}
            options={options}
            dropdownStyle={{ border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <div className={styles.inputContainer}>
          <Typography.Title level={5}>Description</Typography.Title>
          <Input showCount maxLength={20} placeholder="Description" />
        </div>
        <div className={styles.inputContainer}>
          <Typography.Title level={5}>Content</Typography.Title>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <MDXEditor markdown={markdown} />
          </div>
        </div>
        <Button type="primary" onClick={handleSavePost}>
          Add Post
        </Button>
      </form>
    </>
  );
}

export default EditorPage;
