import Markdown from "markdown-to-jsx";
import {
  CustomH2,
  CustomH1,
  CustomParagraph,
  CustomUnorderedList,
  CustomOrderedList,
  CustomListItem,
  CustomH3,
  CustomH4,
} from "./customJsxs";
import RichArticlePreBlock from "./richArticlePreBlock";

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
          h3: CustomH3,
          h4: CustomH4,
          p: CustomParagraph,
          ol: CustomOrderedList,
          ul: CustomUnorderedList,
          li: CustomListItem,
          pre: RichArticlePreBlock,
          // inlineCode: 用global style設定:not(pre > code)，才不會蓋過pre底下的code element
        },
      }}
    >
      {children}
    </Markdown>
  );
}

export default CustomMarkdown;
