"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isMobile } from "@/helpers/common";
import { usePathname } from "next/navigation";

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);
  const [showCursor, setShowCursor] = useState(true);
  const pathname = usePathname();

  // 定義不顯示 Cursor 的路由前綴
  const noCursorRoutePrefixes = ["/blog", "/admin"];

  useEffect(() => {
    if (!showCursor) return;

    if (hasMounted.current) {
      // 僅在組件更新時執行的副作用
      for (let i = 0; i < 200; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        cursorRef.current?.appendChild(circle);
      }

      const circles = document.querySelectorAll(".circle");
      const handleMouseMove = (e: MouseEvent) => {
        circles.forEach((circle) => {
          if (!circle.classList.contains("visible")) {
            circle.classList.add("visible");
          }
        });
        // console.log("hasMounted.current", hasMounted.current);

        gsap.to(".circle", {
          duration: 0.025,
          x: e.clientX,
          y: e.clientY,
          stagger: -0.0025,
          scale: (i) => 1 + i * (2 / 200),
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    } else {
      hasMounted.current = true;
    }
  }, [showCursor]);

  useEffect(() => {
    if (isMobile()) {
      setShowCursor(false);
      return;
    }

    // 檢查是否為不顯示 Cursor 的路由
    const shouldHideCursor = noCursorRoutePrefixes.some((prefix) =>
      pathname.startsWith(prefix)
    );
    setShowCursor(!shouldHideCursor);
  }, [pathname]);

  const renderCursor = () => {
    return <div ref={cursorRef} className="cursor" />;
  };

  return showCursor ? renderCursor() : null;
}

export default Cursor;
