import React, { isValidElement } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import stackOverflowDark from "react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-dark";
import styles from "./customJsxs.module.css";

type RichArticleCodeBlockProps = {
  children: string;
  className: string;
};

export const RichArticleCodeBlock = ({
  children,
  className,
}: RichArticleCodeBlockProps) => {
  const language = className?.replace("lang-", "");

  return (
    <SyntaxHighlighter
      language={language}
      style={stackOverflowDark}
      showLineNumbers
      // wrapLongLines
      className={styles.preformatted}
      // CodeTag={"span"}
    >
      {children}
    </SyntaxHighlighter>
  );
};

type RichArticlePreBlockProps = {
  children: React.ReactNode;
};
function RichArticlePreBlock({ children, ...rest }: RichArticlePreBlockProps) {
  if (isValidElement(children) && children.type === "code") {
    return (
      <RichArticleCodeBlock
        // children={children.props.children}
        className={children.props.className}
      >
        {children.props.children}
      </RichArticleCodeBlock>
    );
  }

  return <pre {...rest}>{children}</pre>;
}

export default RichArticlePreBlock;
