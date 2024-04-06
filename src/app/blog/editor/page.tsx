import dynamic from "next/dynamic";
import { Input } from "antd";

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

const markdown = `Hello **world**!`;

function EditorPage() {
  return (
    <>
      <form action="addPost">
        <Input placeholder="Blog title" />
        <Input placeholder="Blog description" />
        <Input placeholder="Slug" />
        <Input placeholder="Categories" />
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <MDXEditor markdown={markdown} />
        </div>
      </form>
    </>
  );
}

export default EditorPage;
