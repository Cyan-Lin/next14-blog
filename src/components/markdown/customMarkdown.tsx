import Markdown from "markdown-to-jsx";
import { ReactNode } from "react";
import {
  CustomH2,
  CustomH1,
  CustomParagraph,
  CustomUnorderedList,
} from "./customJsxs";

type Props = {
  children: string;
};

function CustomMarkdown({ children }: Props) {
  return (
    <Markdown
      options={{
        overrides: {
          h1: CustomH1,
          h2: CustomH2,
          p: CustomParagraph,
          ul: CustomUnorderedList,
        },
      }}
    >
      {children}
    </Markdown>
  );
}

export default CustomMarkdown;
