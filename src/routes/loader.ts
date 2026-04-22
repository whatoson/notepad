import { localNotesRepository } from "@/services/localNotesRepository";
import type { NoteMeta } from "@/types/note";

export interface MainLayoutLoaderData {
  notes: NoteMeta[];
}

export async function mainLayoutLoader(): Promise<MainLayoutLoaderData> {
  const notes = await localNotesRepository.getNotes();
  return { notes };
}
