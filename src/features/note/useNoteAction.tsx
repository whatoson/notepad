import { create } from "zustand";

export type ModalType = "create" | "update" | "delete";

interface NoteActionState {
  modal: ModalType | null;
  id: string | null;
  open: (t: ModalType, id?: string) => void;
  close: () => void;
}

export const useNoteAction = create<NoteActionState>((set) => ({
  modal: null,
  id: null,
  open: (t: ModalType, id?: string) => set({ modal: t, id: id }),
  close: () => set({ modal: null, id: null }),
}));
