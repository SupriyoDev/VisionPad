"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const Editor = () => {
  return (
    <div className="  h-full ">
      <Link href={"/"}>
        <Button className=" top-[7px] left-4 z-30 fixed ">
          <Home />
        </Button>
      </Link>
      <SimpleEditor key={"editor"} />
    </div>
  );
};

export default Editor;
