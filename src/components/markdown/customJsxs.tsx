import { ReactNode } from "react";
import styles from "./customJsxs.module.css";

type Props = {
  children: ReactNode;
};

function CustomH1({ children }: Props) {
  return <h1 className={styles.title_1}>{children}</h1>;
}

function CustomH2({ children }: Props) {
  return <h2 className={styles.title_2}>{children}</h2>;
}

function CustomParagraph({ children }: Props) {
  return <p className={styles.paragraph}>{children}</p>;
}

function CustomUnorderedList({ children }: Props) {
  return <ul className={styles.unorderedList}>{children}</ul>;
}

export { CustomH1, CustomH2, CustomParagraph, CustomUnorderedList };
