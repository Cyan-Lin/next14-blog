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

function CustomH3({ children }: Props) {
  return <h3 className={styles.title_3}>{children}</h3>;
}

function CustomH4({ children }: Props) {
  return <h4 className={styles.title_4}>{children}</h4>;
}

function CustomParagraph({ children }: Props) {
  return <p className={styles.paragraph}>{children}</p>;
}

function CustomOrderedList({ children }: Props) {
  return <ol className={styles.orderedList}>{children}</ol>;
}

function CustomUnorderedList({ children }: Props) {
  return <ul className={styles.unorderedList}>{children}</ul>;
}

function CustomListItem({ children }: Props) {
  return <li className={styles.listItem}>{children}</li>;
}

export {
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomParagraph,
  CustomOrderedList,
  CustomUnorderedList,
  CustomListItem,
};
