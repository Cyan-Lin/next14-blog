import Markdown from "markdown-to-jsx";
import { ReactNode } from "react";
import customH1 from "./customJsxs";

type Props = {
  children: string;
};

function CustomMarkdown({ children }: Props) {
  return (
    <Markdown
      options={{
        overrides: {
          h1: customH1,
        },
      }}
    >
      {children}
    </Markdown>
  );
}

export default CustomMarkdown;
