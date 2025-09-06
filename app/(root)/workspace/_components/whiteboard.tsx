"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { components } from "./export-canvas-btn";

export default function WhiteboardCanvas({
  persistenceKey,
}: {
  persistenceKey: string;
}) {
  return (
    <div className="relative h-full w-full">
      <Tldraw persistenceKey={persistenceKey} components={components} />
    </div>
  );
}
