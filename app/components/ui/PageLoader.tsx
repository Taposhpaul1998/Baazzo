"use client";

/**
 * PageLoader — YouTube-style top progress bar.
 * Brand color: --color-primary (#f06a38 orange).
 *
 * Usage:
 *   import PageLoader from "@/app/components/ui/PageLoader";
 *   <PageLoader />
 *
 * Drop this inside any loading.tsx file and all future pages
 * will get the same consistent loading style automatically.
 */

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [width, setWidth] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start: quickly jump to 20%, then slowly crawl to 90%
    const start = setTimeout(() => setWidth(20), 50);
    const mid = setTimeout(() => setWidth(60), 300);
    const crawl = setTimeout(() => setWidth(85), 800);
    const nearEnd = setTimeout(() => setWidth(92), 1800);

    // Finish: snap to 100% then fade out
    const finish = setTimeout(() => {
      setWidth(100);
      setTimeout(() => setOpacity(0), 200);
    }, 2500);

    return () => {
      clearTimeout(start);
      clearTimeout(mid);
      clearTimeout(crawl);
      clearTimeout(nearEnd);
      clearTimeout(finish);
    };
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 z-[9999] h-[3px] pointer-events-none"
        style={{
          width: `${width}%`,
          opacity,
          background:
            "linear-gradient(to right, #f06a38, #fb923c)",
          boxShadow: "0 0 8px 1px rgba(240, 106, 56, 0.6)",
          transition:
            width === 100
              ? "width 0.2s ease-out, opacity 0.3s ease 0.2s"
              : "width 0.6s cubic-bezier(0.1, 0.4, 0.6, 1)",
        }}
      >
        {/* Glowing tip */}
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{
            background: "#f06a38",
            boxShadow: "0 0 10px 4px rgba(240, 106, 56, 0.8)",
          }}
        />
      </div>

      {/* Full-page subtle dark overlay — optional, keeps content visible */}
      <div
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: "rgba(15,23,42,0.08)",
          opacity,
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
}
