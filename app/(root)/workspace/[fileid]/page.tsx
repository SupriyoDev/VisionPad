"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotebookText, PenTool } from "lucide-react";
import { useParams } from "next/navigation";
import Editor from "../_components/editor";
import WhiteboardCanvas from "../_components/whiteboard";

const WorkspaceFile = () => {
  const params = useParams();
  return (
    <div className=" w-full h-screen flex flex-col overflow-hidden">
      {/* <WorkspaceHeader /> */}

      <div className="w-full flex-1 overflow-hidden relative  ">
        <Tabs
          defaultValue="document"
          className="relative w-full h-full flex flex-col"
        >
          <TabsList className=" self-center absolute top-1.5  bg-gray-950 w-[100px]  z-50 ml-10 ">
            <TabsTrigger value="document">
              <NotebookText className="size-5 text-white" />{" "}
            </TabsTrigger>
            {/* <TabsTrigger value="both" className="">
              Both
            </TabsTrigger> */}
            <TabsTrigger value="canvas">
              <PenTool className="size-5 text-white" />{" "}
            </TabsTrigger>
          </TabsList>

          {/* editor  */}
          <TabsContent value="document" className="flex-1 h-full">
            <div className="w-full h-full overflow-y-auto px-6 py-1">
              <Editor />
            </div>
          </TabsContent>
          {/* canvas  */}
          <TabsContent value="canvas" className="flex-1 h-full ">
            <div className="w-full h-full  overflow-hidden">
              <WhiteboardCanvas persistenceKey={params.fileid as string} />
            </div>
          </TabsContent>

          {/* both  */}
          {/* <TabsContent value="both" className="flex-1 h-full">
            <ResizablePanelGroup
              direction="horizontal"
              className="w-full h-full rounded-lg border overflow-hidden "
            >
              <ResizablePanel
                defaultSize={35}
                className="min-w-[15%] bg-slate-100 border-r"
              >
                <div className="w-full overflow-y-auto h-full  py-6 px-4">
                  <Editor key={"editor"} />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={65} className="min-w-[40%]">
                <div className="w-full h-full overflow-hidden">
                  <WhiteboardCanvas persistenceKey={params.fileid as string} />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default WorkspaceFile;
