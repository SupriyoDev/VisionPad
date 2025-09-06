"use client";

import { saveDocToRemote } from "@/lib/action";
import { getData, saveData } from "@/lib/index-db";
import { useEditorStore } from "@/store/editor-store";
import CodeBox from "@bomdi/codebox";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import axios from "axios";
import debounce from "debounce";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const fallBackDoc = {
  time: 1550476186479,
  blocks: [
    {
      id: "AOulAjL8XM",
      type: "header",
      data: {
        text: "Project Initialize",
        level: 1,
      },
    },
    {
      id: "cyZjplMOZ0",
      type: "header",
      data: {
        text: "Type your notes or documents here -- style with markdown or shortcuts (Ctrl/)",
        level: 6,
      },
    },
  ],
  version: "2.8.1",
};

const Editor = () => {
  const { fileid } = useParams();
  const setEditorstore = useEditorStore((state) => state.setEditor);
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    //Solution-- debounced local save
    const debouncedLocalSave = debounce(async (content) => {
      await saveData(`${fileid}`, content);
    }, 300);
    //debounced remote save
    const debouncedRemoteSave = debounce(async (content) => {
      try {
        await saveDocToRemote(`${fileid}`, JSON.stringify(content));
      } catch (error) {
        console.log("remote save error");
      }
    }, 30 * 1000);
    const Init = async () => {
      let documentBlocks;

      //local data
      const local = await getData(fileid as string);

      if (local?.data) {
        documentBlocks = local?.data;
      } else {
        //remote data
        const remoteRes = await axios.get("/api/document", {
          params: {
            fileId: fileid,
          },
        });

        if (remoteRes.data?.doc) {
          documentBlocks = JSON.parse(remoteRes.data?.doc);
          //set the remote data to indexdb cache
          await saveData(fileid as string, documentBlocks);
        } else {
          documentBlocks = fallBackDoc;
        }
      }

      //Initialize editor instance
      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: "editorjs",
          data: documentBlocks,
          autofocus: true,
          onChange: async () => {
            if (!editorRef.current) return;
            const content = await editorRef.current.save();
            //save doc to local indexdb
            debouncedLocalSave(content);
            //save to remote db
            debouncedRemoteSave(content);

            //
          },
          tools: {
            codebox: {
              class: CodeBox,
              config: {
                themeURL:
                  "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css",
                themeName: "atom-one-dark",
                useDefaultTheme: "light",
              },
            },
            header: {
              class: Header as any,
              inlineToolbar: true,
              config: {
                placeholder: "enter a header",
              },
            },
            list: { class: List as any, inlineToolbar: true },
            quote: { class: Quote, inlineToolbar: true },
            image: { class: SimpleImage, inlineToolbar: true },
            link: { class: Link, inlineToolbar: true },
            embed: {
              class: Embed,
              config: {
                services: {
                  youtube: true,
                  twitter: true,
                  vimeo: true,
                  instagram: true,
                },
              },
            },
          },
        });

        editor.isReady.then(() => {
          setEditorstore(editor);
          // ✅ safe place to render
        });

        editorRef.current = editor;
      }
      //  else {
      //   await editorRef.current.isReady;
      //   editorRef.current.render(placeholderdata);
      // }
    };
    Init();
  }, [fileid, setEditorstore]);
  return <div id="editorjs" className=" w-full h-full"></div>;
};

export default Editor;
