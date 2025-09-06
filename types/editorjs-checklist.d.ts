// src/types/editorjs-checklist.d.ts
// declare module "@editorjs/checklist" {
//   import { BlockToolConstructable, BlockTool } from "@editorjs/editorjs";

//   interface ChecklistDataItem {
//     text: string;
//     checked: boolean;
//   }

//   interface ChecklistData {
//     items: ChecklistDataItem[];
//   }

//   export default class Checklist implements BlockTool {
//     constructor(config: { data: ChecklistData; api: any; config?: any });
//     render(): HTMLElement;
//     save(blockContent: HTMLElement): ChecklistData;
//     validate(savedData: ChecklistData): boolean;
//     static get toolbox(): { title: string; icon: string };
//   }
// }

declare module "@editorjs/checklist";

declare module "@editorjs/link";

declare module "@editorjs/simple-image";

declare module "@editorjs/embed";
declare module "@bomdi/codebox";
