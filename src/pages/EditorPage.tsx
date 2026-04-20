import { Editor } from "@/features/editor/Editor";
import type { JSONContent } from "@tiptap/react";
import { useLoaderData } from "react-router";

export function EditorPage() {
  const content = useLoaderData() as JSONContent;
  return <Editor content={content} />;
}
