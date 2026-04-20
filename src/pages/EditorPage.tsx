import { Editor } from "@/features/editor/Editor";
import type { JSONContent } from "@tiptap/react";
import { useLoaderData } from "react-router";

export interface EditorPageLoaderData {
  id: string;
  content: JSONContent | undefined;
}

export function EditorPage() {
  const { id, content } = useLoaderData<EditorPageLoaderData>();
  return <Editor id={id} content={content} />;
}
