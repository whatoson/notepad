import { Placeholder } from "@tiptap/extensions";
import { Tiptap, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./editor.css";

interface Props {
  content: JSONContent | undefined;
}

export function Editor({ content }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder],
    content,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert focus:outline-none h-full w-full max-w-full break-all",
      },
    },
  });

  return (
    <Tiptap editor={editor}>
      <Tiptap.Content className="flex-1 w-full overflow-y-auto p-4" />
    </Tiptap>
  );
}
