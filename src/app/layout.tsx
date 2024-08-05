import type { Metadata } from "next";
import { Roboto, Noto_Sans_TC } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import { ConfigProvider } from "antd";
import { theme } from "@/styles/theme";
import React, { useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import styles from "./layout.module.css";
import Cursor from "@/components/cursor";
import { isMobile } from "@/constant/common";
import Eruda from "@/components/eruda";

const noto_sans_tc_init = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-noto-sans-tc",
});

const roboto_init = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "Next.js 14 Homepage",
    template: "%s | Next.js 14",
  },
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigProvider theme={theme}>
        <body
          className={`${styles.body} ${noto_sans_tc_init.variable} ${roboto_init.variable}`}
        >
          {/* {<Eruda />} */}
          <Cursor />
          <div className="container">
            <AntdRegistry>
              <Navbar />
              {children}
              <Footer />
            </AntdRegistry>
          </div>
        </body>
      </ConfigProvider>
    </html>
  );
}
