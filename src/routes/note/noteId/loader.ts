import { localNotesRepository } from "@/services/localNotesRepository";
import type { JSONContent } from "@tiptap/react";
import type { LoaderFunctionArgs } from "react-router";

export interface NoteIdLoaderData {
  id: string;
  content: JSONContent | undefined;
}

export async function noteIdLoader({
  params,
}: LoaderFunctionArgs): Promise<NoteIdLoaderData> {
  if (!params.noteId) {
    throw new Error("Note ID is required");
  }
  const content = await localNotesRepository.getNoteContent(params.noteId);
  return {
    id: params.noteId,
    content,
  };
}
