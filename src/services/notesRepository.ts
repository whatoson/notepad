import type { JSONContent } from "@tiptap/react";
import type { CreateNoteDto, NoteMeta, UpdateNoteDto } from "../types/note";

export interface NotesRepository {
  getNotes: () => Promise<NoteMeta[]>;
  createNote: (dto: CreateNoteDto) => Promise<NoteMeta>;
  getNoteContent: (id: string) => Promise<JSONContent | undefined>;
  updateNote: (dto: UpdateNoteDto) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}
