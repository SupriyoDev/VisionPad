import { create } from "zustand";
import type EditorJS from "@editorjs/editorjs";

interface EditorStore {
  editor: EditorJS | null;
  setEditor: (editor: EditorJS) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
