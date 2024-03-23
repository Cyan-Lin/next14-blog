import dynamic from "next/dynamic";
import { Suspense } from "react";

const MDXEditor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

const markdown = `Hello **world**!`;

function EditorPage() {
  return (
    <>
      <div style={{ border: "1px solid #ccc", borderRadius: "4px" }}>
        <Suspense fallback={null}>
          <MDXEditor markdown={markdown} />
        </Suspense>
      </div>
    </>
  );
}

export default EditorPage;
