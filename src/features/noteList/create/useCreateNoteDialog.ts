import { create } from "zustand";

interface CreateNoteDialogState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateNoteDialog = create<CreateNoteDialogState>((set) => ({
  isOpen: false,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  },
}));
