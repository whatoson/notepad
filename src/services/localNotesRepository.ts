import type {
  CreateNoteDto,
  Note,
  NoteMeta,
  UpdateNoteDto,
} from "@/types/note";
import type { JSONContent } from "@tiptap/react";
import type { NotesRepository } from "./notesRepository";
import { notesStorage } from "./notesStorage";

export const localNotesRepository: NotesRepository = {
  async getNotes(): Promise<NoteMeta[]> {
    const notes: NoteMeta[] = [];
    await notesStorage.iterate((note: Note) => {
      notes.push({
        id: note.id,
        title: note.title,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      });
    });
    return notes.sort((a, b) => b.createdAt - a.createdAt);
  },

  async createNote(dto: CreateNoteDto): Promise<NoteMeta> {
    const note: Note = {
      id: crypto.randomUUID(),
      title: dto.title,
      content: undefined,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await notesStorage.setItem(note.id, note);

    const meta: NoteMeta = {
      id: note.id,
      title: note.title,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
    return meta;
  },

  async getNoteContent(id: string): Promise<JSONContent | undefined> {
    const note = await notesStorage.getItem<Note>(id);
    if (!note) throw new Error("Note not found");

    const content = note.content;
    return content;
  },

  async updateNote(dto: UpdateNoteDto): Promise<void> {
    const note = await notesStorage.getItem<Note>(dto.id);
    if (!note) throw new Error("Note not found");

    note.title = dto.title || note.title;
    note.content = dto.content || note.content;
    note.updatedAt = Date.now();

    await notesStorage.setItem(note.id, note);
  },

  async deleteNote(id: string): Promise<void> {
    await notesStorage.removeItem(id);
  },
};
