"use client";

import { Button } from "@/components/ui/button";
import { saveDocToRemote } from "@/lib/action";
import { useEditorStore } from "@/store/editor-store";
import { Link as LinkICON, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const WorkspaceHeader = () => {
  const { fileid } = useParams();

  const editor = useEditorStore((state) => state.editor);
  const handleSave = () => {
    if (editor) {
      editor
        .save()
        .then(async (outputData) => {
          await saveDocToRemote(`${fileid}`, JSON.stringify(outputData));
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  return (
    <div className="p-1 px-20 border-b w-full flex justify-between items-center  ">
      <Link href={"/dashboard"}>
        <Image
          src={"/logo.png"}
          alt=""
          width={100}
          height={100}
          className="w-20 h-auto"
        />
      </Link>
      <div className=" flex flex-row items-center gap-3">
        <Button
          className="bg-amber-500 hover:bg-amber-500/70"
          onClick={handleSave}
        >
          <Save />
          Save
        </Button>

        <Button className="bg-indigo-600">
          Share <LinkICON />
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
