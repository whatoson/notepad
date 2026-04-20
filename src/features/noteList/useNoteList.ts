import { localNotesRepository } from "@/services/localNotesRepository";
import type { CreateNoteDto, NoteMeta } from "@/types/note";
import { create } from "zustand";

interface NoteListState {
  notes: NoteMeta[];
  refresh: () => Promise<void>;
  createNote: (dto: CreateNoteDto) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const useNoteList = create<NoteListState>((set, get) => ({
  notes: [],
  refresh: async () => {
    const notes = await localNotesRepository.getNotes();
    set({ notes });
  },
  createNote: async (dto: CreateNoteDto) => {
    await localNotesRepository.createNote(dto);
    get().refresh();
  },
  deleteNote: async (id) => {
    await localNotesRepository.deleteNote(id);
    get().refresh();
  },
}));
