import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function customH1({ children }: Props) {
  return <h1>{children}</h1>;
}

export default customH1;
