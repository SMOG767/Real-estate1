"use client";

import { useRef, type ReactNode } from "react";

export default function Magnetic({
  children,
  strength = 14,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    node.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const onLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block will-change-transform ${className}`}
      style={{ transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </span>
  );
}
