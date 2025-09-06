import { openDB } from "idb";

export const dbPromise = openDB("editor-db", 1, {
  upgrade(db) {
    //create a document table
    if (!db.objectStoreNames.contains("documents")) {
      db.createObjectStore("documents", {
        keyPath: "id",
      });
    }

    //create a todo table
    if (!db.objectStoreNames.contains("todos")) {
      db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
    }
  },
});

export async function saveData(id: string, data: any) {
  const db = await dbPromise;
  await db.put("documents", { id, data, updatedAt: new Date() });
}

export async function getData(id: string) {
  const db = await dbPromise;
  return await db.get("documents", id);
}
