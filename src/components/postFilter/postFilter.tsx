"use client";

import { Button, Dropdown, MenuProps, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./postFilter.module.css";
import { useState } from "react";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import styled from "styled-components";
import { PostCategory } from "@/interfaces/I_Post";

type Props = {
  categories: PostCategory[];
};

const CustomDropdown = styled(Dropdown)`
  min-width: 100px;
  background-color: var(--color-gray-1);

  .ant-space {
    width: 100%;
    justify-content: space-between;

    .ant-space-item {
      // background-color: blue;
    }
  }
`;

function PostFilter(props: Props) {
  const { categories } = props;

  const [filter, setFilter] = useState<MenuItemType>({
    label: "ALL",
    key: "all",
  });

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const clickedItem = items?.find((item) => item?.key === e.key);
    if (!clickedItem) return;

    setFilter({
      label: clickedItem.label,
      key: clickedItem.key,
    });
  };

  const items: MenuItemType[] = [
    {
      label: "ALL",
      key: "all",
    },
    ...categories.map((category) => ({
      label: category.name,
      key: category.key,
    })),
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className={styles.postFilter}>
      <CustomDropdown menu={menuProps} trigger={["click"]}>
        <Button>
          <Space>
            {filter.label}
            <DownOutlined />
          </Space>
        </Button>
      </CustomDropdown>
    </div>
  );
}

export default PostFilter;
