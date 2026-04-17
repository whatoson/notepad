import localforage from "localforage";

export const notesStorage = localforage.createInstance({
  name: "notes",
  version: 1,
  storeName: "notes",
});
