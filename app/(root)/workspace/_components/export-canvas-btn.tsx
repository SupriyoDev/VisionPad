import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { Tldraw, TLUiComponents, useEditor } from "tldraw";
import "tldraw/tldraw.css";

function ExportCanvasBtn() {
  const editor = useEditor();
  const [bg, setBg] = useState(false);
  const [Padding, setPadding] = useState(false);

  return (
    <div className=" flex flex-row items-center gap-2 p-4 border border-t-0 rounded-bl-lg">
      <Button
        variant={"outline"}
        style={{ pointerEvents: "all" }}
        onClick={async () => {
          const shapeIds = editor.getCurrentPageShapeIds();
          if (shapeIds.size === 0) return alert("No shapes on the canvas");
          const { blob } = await editor.toImage([...shapeIds], {
            format: "jpeg",
            background: true,
            padding: 20,
          });

          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "drawing.jpeg";
          link.click();
          URL.revokeObjectURL(link.href);
        }}
      >
        Jpeg
      </Button>
      <Button
        variant={"outline"}
        style={{ pointerEvents: "all" }}
        onClick={async () => {
          const shapeIds = editor.getCurrentPageShapeIds();
          if (shapeIds.size === 0) return alert("No shapes on the canvas");
          const { blob } = await editor.toImage([...shapeIds], {
            format: "png",
            background: true,
            padding: 20,
          });

          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "drawing.png";
          link.click();
          URL.revokeObjectURL(link.href);
        }}
      >
        Png
      </Button>
      <Button
        variant={"outline"}
        style={{ pointerEvents: "all" }}
        onClick={async () => {
          const shapeIds = editor.getCurrentPageShapeIds();
          if (shapeIds.size === 0) return alert("No shapes on the canvas");
          const { blob } = await editor.toImage([...shapeIds], {
            format: "svg",
            background: true,
            padding: 20,
          });

          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "drawing.svg";
          link.click();
          URL.revokeObjectURL(link.href);
        }}
      >
        Svg
      </Button>
    </div>
  );
}

export const components: TLUiComponents = {
  SharePanel: ExportCanvasBtn,
};
