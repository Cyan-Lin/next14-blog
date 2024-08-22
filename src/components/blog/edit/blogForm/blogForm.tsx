"use client";

import { BaseResponse } from "@/interfaces/I_Base";
import {
  FormInfo,
  PostCategory,
  PostData,
  SavePostRequest,
  UpdatePostRequest,
} from "@/interfaces/I_Post";
import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
  SelectProps,
} from "antd";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getPostCategories } from "@/app/domainApi/post";
import styled from "styled-components";

type Props = {
  postData?: PostData;
};

const CustomCategoryItem = styled(Form.Item<FormInfo>)`
  .ant-form-item-control-input-content {
    display: flex;
    gap: 5px;
  }

  .ant-btn {
    height: unset;
  }
`;

const MDXEditor = dynamic(
  () => import("@/components/blog/edit/editor/editor"),
  {
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
  }
);

function BlogForm({ postData }: Props) {
  const { title, slug, categories, desc, content } = postData || {};

  const [postCategories, setPostCategories] = useState<SelectProps["options"]>(
    []
  );
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  useEffect(() => {
    getCategories();

    if (!Cookies.get("user")) {
      window.location.href = "/login";
    }
  }, []);

  const getCategories = async () => {
    const categories = await getPostCategories();

    setPostCategories(
      categories.map((category) => ({
        label: category.name,
        value: category.key,
      }))
    );
  };

  const handleSavePost = async ({
    title,
    slug,
    categories,
    desc,
    content,
  }: SavePostRequest): Promise<BaseResponse<string[]>> => {
    const res = await fetch(`${process.env.MAIN_API_DOMAIN}/api/blog`, {
      method: "POST",
      body: JSON.stringify({
        title,
        slug,
        categories,
        desc,
        content,
      }),
    });

    return res.json();
  };

  const handleUpdatePost = async ({
    title,
    categories,
    desc,
    content,
  }: UpdatePostRequest): Promise<BaseResponse<PostData>> => {
    const res = await fetch(`${process.env.MAIN_API_DOMAIN}/api/blog/${slug}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        categories,
        desc,
        content,
      }),
    });

    return res.json();
  };

  const onFinish: FormProps<FormInfo>["onFinish"] = async (values) => {
    let res;

    try {
      if (postData) {
        res = await handleUpdatePost({
          title: values.title,
          categories: values.categories,
          desc: values.description,
          content: values.content,
        });
      } else {
        res = await handleSavePost({
          title: values.title,
          slug: values.slug,
          categories: values.categories,
          desc: values.description,
          content: values.content,
        });
      }

      if (res.status === "success") {
        alert(res.message);
      } else if (res.message === "duplicate key error") {
        alert(`duplicate key error: ${res.data}`);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed: FormProps<FormInfo>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form
      layout="vertical"
      initialValues={{
        title: title || "",
        slug: slug || "",
        categories: categories || [],
        description: desc || "",
        content: content || "",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FormInfo>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input blog title!" }]}
      >
        <Input
          showCount
          // maxLength={20}
          placeholder="Title"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>
      <Form.Item<FormInfo>
        label="Slug"
        name="slug"
        rules={[
          {
            required: true,
            pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            message: "Please input slug!",
          },
        ]}
      >
        <Input
          showCount
          // maxLength={20}
          placeholder="Title"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
          disabled={!!postData}
        />
      </Form.Item>
      <CustomCategoryItem
        label="Categories"
        name="categories"
        rules={[{ required: true, message: "Please select categories!" }]}
        // style={{ display: "flex" }}
      >
        <Select
          mode="multiple"
          size="large"
          placeholder="Please select categories"
          // defaultValue={["a10", "c12"]}
          // onChange={(value) => setCategories(value)}
          // style={{ width: "100%" }}
          style={{ width: "90%" }}
          options={postCategories}
          // dropdownStyle={{ border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <Button type="primary" onClick={() => setCategoryModalOpen(true)}>
          Add Category
        </Button>
        <Modal
          title="Add Category"
          centered
          open={categoryModalOpen}
          onOk={() => setCategoryModalOpen(false)}
          onCancel={() => setCategoryModalOpen(false)}
          width={1000}
        >
          {/* <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p> */}
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Tags Mode"
            onChange={handleChange}
            options={postCategories}
          />
        </Modal>
      </CustomCategoryItem>
      <Form.Item<FormInfo>
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input blog description!" }]}
      >
        <Input
          showCount
          // maxLength={20}
          placeholder="Description"
        />
      </Form.Item>
      <Form.Item<FormInfo>
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please input blog content!" }]}
        getValueFromEvent={(data) => data}
      >
        <MDXEditor
          markdown={content || ""}
          // onChange={(markdown) => setContent(markdown)}
        />
      </Form.Item>
      <Form.Item
      //  wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button type="primary" htmlType="submit">
          {postData ? "Update Post" : "Add Post"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default BlogForm;
