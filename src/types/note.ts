import type { JSONContent } from "@tiptap/react";

export interface Note {
  id: string;
  title: string;
  content: JSONContent;
  updatedAt: number;
  createdAt: number;
}

export type NoteMeta = Pick<Note, "id" | "title" | "createdAt" | "updatedAt">;

export type CreateNoteDto = Pick<Note, "title">;

export type UpdateNoteDto = Pick<Note, "id"> &
  Partial<Pick<Note, "title" | "content">>;
