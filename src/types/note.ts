import type { JSONContent } from "@tiptap/react";

export interface Note {
  id: string;
  title: string;
  content: JSONContent;
  updatedAt: number;
  createdAt: number;
}

export type NoteMeta = Pick<Note, "id" | "title" | "createdAt" | "updatedAt">;
