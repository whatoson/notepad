import { Editor } from "@/features/editor/Editor";
import type { NoteIdLoaderData } from "@/routes/note/noteId/loader";
import { useLoaderData } from "react-router";

export function EditorPage() {
  const { id, content } = useLoaderData<NoteIdLoaderData>();
  return <Editor id={id} content={content} />;
}
