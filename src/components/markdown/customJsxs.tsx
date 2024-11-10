import { ReactNode } from "react";
import styles from "./customJsxs.module.scss";

type Props = {
  children: ReactNode;
};

type LinkProps = {
  children: ReactNode;
  href?: string;
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

function CustomH5({ children }: Props) {
  return <h5 className={styles.title_5}>{children}</h5>;
}

function CustomH6({ children }: Props) {
  return <h6 className={styles.title_6}>{children}</h6>;
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

function CustomLink({ children, href }: LinkProps) {
  return (
    <a className={styles.link} href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}

function CustomBlockQuote({ children }: Props) {
  return <blockquote className={styles.blockQuote}>{children}</blockquote>;
}

function CustomTable({ children }: Props) {
  return <table className={styles.table}>{children}</table>;
}

function CustomTableRow({ children }: Props) {
  return <tr>{children}</tr>;
}

function CustomTableHead({ children }: Props) {
  return <th>{children}</th>;
}

function CustomTableCell({ children }: Props) {
  return <td>{children}</td>;
}

function CustomHr() {
  return <hr className={styles.hr} />;
}

export {
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomH5,
  CustomH6,
  CustomParagraph,
  CustomOrderedList,
  CustomUnorderedList,
  CustomListItem,
  CustomLink,
  CustomBlockQuote,
  CustomTable,
  CustomTableRow,
  CustomTableHead,
  CustomTableCell,
  CustomHr,
};
