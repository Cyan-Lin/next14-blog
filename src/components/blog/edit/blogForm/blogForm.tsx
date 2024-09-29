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
  Alert,
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
  SelectProps,
  Space,
  Spin,
  Switch,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getPostCategories } from "@/app/domainApi/post";
import styled from "styled-components";
import { useSession } from "next-auth/react";

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
  const [allCategories, setAllCategories] = useState<PostCategory[]>([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [alertProps, setAlertProps] = useState<{
    open: boolean;
    message: string;
    type: "success" | "info" | "warning" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      setIsAdmin(session.user?.isAdmin || false);
    }
  }, [sessionStatus]);

  const getAllCategories = async () => {
    const allCategories = await getPostCategories();

    setAllCategories(allCategories);
    setPostCategories(
      allCategories.map((category) => ({
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
    adminOnly,
  }: SavePostRequest): Promise<BaseResponse<string[]>> => {
    const res = await fetch(`${process.env.MAIN_API_DOMAIN}/api/blog`, {
      method: "POST",
      body: JSON.stringify({
        title,
        slug,
        categories,
        desc,
        content,
        adminOnly,
      }),
    });

    return res.json();
  };

  const handleUpdatePost = async ({
    title,
    categories,
    desc,
    content,
    adminOnly,
  }: UpdatePostRequest): Promise<BaseResponse<PostData>> => {
    const res = await fetch(`${process.env.MAIN_API_DOMAIN}/api/blog/${slug}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        categories,
        desc,
        content,
        adminOnly,
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
          desc: values.desc,
          content: values.content,
          adminOnly: values.adminOnly,
        });
      } else {
        res = await handleSavePost({
          title: values.title,
          slug: values.slug,
          categories: values.categories,
          desc: values.desc,
          content: values.content,
          adminOnly: values.adminOnly,
        });
      }

      if (res.status === "SUCCESS") {
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

  const onCategoryFormFinish: FormProps<FormInfo>["onFinish"] = async (
    values
  ) => {
    console.log("Received values of form:", values);

    try {
      const res = await fetch(
        `${process.env.MAIN_API_DOMAIN}/api/blog/categories`,
        {
          method: "PUT",
          body: JSON.stringify(values.categories),
        }
      );
      const data = await res.json();
      if (data.message === "SUCCESS") {
        getAllCategories();
        setAlertProps({
          open: true,
          message: "Save category success",
          type: "success",
        });
        setCategoryModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {alertProps.open && (
        <Alert
          message={alertProps.message}
          type={alertProps.type}
          closable
          afterClose={() => setAlertProps({ ...alertProps, open: false })}
          showIcon
        />
      )}
      {sessionStatus === "loading" ? (
        <Spin size="large" />
      ) : (
        <Form
          layout="vertical"
          initialValues={{
            title: title || "",
            slug: slug || "",
            categories: categories || [],
            desc: desc || "",
            content: content || "",
            adminOnly: session?.user.isAdmin || false,
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
              onInput={(e) =>
                ((e.target as HTMLInputElement).value = (
                  e.target as HTMLInputElement
                ).value.toLowerCase())
              }
              disabled={!!postData}
            />
          </Form.Item>
          <CustomCategoryItem
            label="Categories"
            rules={[{ required: true, message: "Please select categories!" }]}
          >
            <Form.Item name="categories" noStyle>
              <Select
                mode="multiple"
                size="large"
                placeholder="Please select categories"
                // defaultValue={["a10", "c12"]}
                // onChange={(value) => setCategories(value)}
                style={{ width: "90%" }}
                options={postCategories}
              />
            </Form.Item>
            <Button
              style={{ width: "10%" }}
              type="primary"
              onClick={() => setCategoryModalOpen(true)}
            >
              Add Category
            </Button>
          </CustomCategoryItem>
          <Form.Item<FormInfo>
            label="Description"
            name="desc"
            rules={[
              { required: true, message: "Please input blog description!" },
            ]}
          >
            <Input
              showCount
              // maxLength={20}
              placeholder="Description"
            />
          </Form.Item>
          {isAdmin && (
            <Form.Item<FormInfo> label="Admin Only" name="adminOnly">
              <Switch />
            </Form.Item>
          )}
          <Form.Item<FormInfo>
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input blog content!" }]}
            getValueFromEvent={(data) => data}
          >
            <MDXEditor markdown={content || ""} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {postData ? "Update Post" : "Add Post"}
            </Button>
          </Form.Item>
        </Form>
      )}

      {categoryModalOpen && (
        <Modal
          title="Edit Categories"
          centered
          open={categoryModalOpen}
          // onOk={() => setCategoryModalOpen(false)} // 不需要onOk，因為要留到onFinish成功再關閉
          okText="Save"
          okButtonProps={{
            form: "categoryForm", // 綁定特定表單
            htmlType: "submit", // 觸發表單提交
          }}
          onCancel={() => setCategoryModalOpen(false)}
          width={1000}
        >
          <Form
            name="categoryForm"
            onFinish={onCategoryFormFinish}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{
              categories: allCategories,
            }}
          >
            <Form.List name="categories">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "key"]}
                        rules={[
                          { required: true, message: "Missing category key" },
                          {
                            pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                            message: "Invalid category key",
                          },
                        ]}
                      >
                        <Input placeholder="Category Key" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                      >
                        <Input placeholder="Category Name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default BlogForm;
