"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor from "../_components/editor";
import WorkspaceHeader from "../_components/workspace-header";
import { useEditorStore } from "@/store/editor-store";
import { useState } from "react";
import WhiteBoard from "../_components/whiteboard";
import WhiteboardCanvas from "../_components/whiteboard";
import { useParams } from "next/navigation";

const WorkspaceFile = () => {
  const params = useParams();
  return (
    <div className=" w-full h-screen flex flex-col">
      <WorkspaceHeader />

      <div className="w-full flex-1 ">
        <Tabs defaultValue="both" className="relative w-full h-full">
          <TabsList className=" self-center absolute -top-12 bg-slate-200 w-[220px]">
            <TabsTrigger value="document">Document </TabsTrigger>
            <TabsTrigger value="both" className="">
              Both
            </TabsTrigger>
            <TabsTrigger value="canvas">Canvas </TabsTrigger>
          </TabsList>

          {/* editor  */}
          <TabsContent value="document" className="">
            <div className="w-full h-full flex-1 px-30 py-10">
              <Editor key={"editor"} />
            </div>
          </TabsContent>
          {/* canvas  */}
          <TabsContent value="canvas" className="w-full h-full ">
            <div className="w-full h-full border-t">
              <WhiteboardCanvas persistenceKey={params.fileid as string} />
            </div>
          </TabsContent>

          {/* both  */}
          <TabsContent value="both">
            <ResizablePanelGroup
              direction="horizontal"
              className="w-full h-full rounded-lg border  "
            >
              <ResizablePanel
                defaultSize={35}
                className="min-w-[15%] bg-slate-100 border-r"
              >
                <div className="flex h-full items-center justify-center py-6 px-4">
                  <Editor key={"editor"} />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={65} className="min-w-[40%]">
                <div className="w-full h-full">
                  <WhiteboardCanvas persistenceKey={params.fileid as string} />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkspaceFile;
