import type { MainLayoutLoaderData } from "@/layouts/MainLayout";
import { localNotesRepository } from "@/services/localNotesRepository";

export async function mainLayoutLoader(): Promise<MainLayoutLoaderData> {
  const notes = await localNotesRepository.getNotes();
  return { notes };
}
