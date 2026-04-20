import type { EditorPageLoaderData } from "@/pages/EditorPage";
import { localNotesRepository } from "@/services/localNotesRepository";
import type { LoaderFunctionArgs } from "react-router";

export async function noteIdLoader({
  params,
}: LoaderFunctionArgs): Promise<EditorPageLoaderData> {
  if (!params.noteId) {
    throw new Error("Note ID is required");
  }
  const content = await localNotesRepository.getNoteContent(params.noteId);
  return {
    id: params.noteId,
    content,
  };
}
