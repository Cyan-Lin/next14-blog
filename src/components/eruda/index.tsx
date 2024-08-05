"use client";

import { useEffect } from "react";

function Eruda() {
  useEffect(() => {
    if (process.env.MODE === "development") {
      import("eruda").then((eruda) => eruda.default.init());
    }
  }, []);

  return <div></div>;
}

export default Eruda;
