import { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    colorText: "var(--text)",
    // colorPrimary: "#bbb",
    // colorError: "orange",
    // colorLink: "yellow",
    // colorLinkHover: "green",
    // colorTextSecondary: "blue",
    // colorTextTertiary: "#eee",
    // colorTextQuaternary: "purple",
    // colorWarning: "magenta",
  },
  components: {
    // Typography: {
    //   colorPrimary: "red",
    //   colorLink: "red",
    //   colorLinkHover: "red",
    //   colorText: "#eee",
    //   colorTextSecondary: "red",
    //   colorTextTertiary: "red",
    //   colorTextQuaternary: "red",
    //   colorWarning: "red",
    // },
    Input: {
      fontSize: 16,
      paddingBlock: 6,
      paddingInline: 10,
      // controlOutlineWidth: 3,
      // controlOutline: "var(--blue-9)",
      lineWidth: 1,
      borderRadius: 3,
      colorBorder: "#bbb",
      hoverBorderColor: "#777",
      activeBorderColor: "var(--blue-9)",
      colorTextPlaceholder: "#aaa",
      colorBgContainer: "var(--bg)",

      // colorPrimary: "red",
      // colorLink: "red",
      // colorLinkHover: "red",
      // colorText: "#eee",
      // colorTextSecondary: "red",
      // colorTextTertiary: "red",
      // colorTextQuaternary: "red",
      // colorWarning: "red",
    },
    Select: {
      // fontSize: 16,
      // paddingBlock: 6,
      // paddingInline: 10,
      // controlOutlineWidth: 3,
      // controlOutline: "var(--blue-9)",
      // lineWidth: 1,
      colorPrimaryHover: "var(--text)",
      // colorBorderBg: "red",
      borderRadiusLG: 3, // input框
      borderRadius: 5, // 選到的選項
      colorText: "var(--text)",
      colorBorder: "#bbb",
      colorBgElevated: "var(--bg)",
      multipleItemBorderColor: "var(--text)",
      boxShadow: "0 0 0 1px var(--bg)",
      optionSelectedBg: "var(--color-gray-6)",
      optionActiveBg: "var(--color-gray-8)",
      colorBgContainer: "var(--bg)",
    },
    Popover: {
      borderRadius: 50,
      borderRadiusOuter: 50,
      borderRadiusLG: 50,
    },
  },
};