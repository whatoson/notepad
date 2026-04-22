import { Placeholder } from "@tiptap/extensions";
import { Tiptap, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { debounce } from "lodash-es";
import { useEffect } from "react";
import { useNote } from "../note/useNote";
import "./editor.css";

interface Props {
  id: string;
  content: JSONContent | undefined;
}

export function Editor({ id, content }: Props) {
  const editor = useEditor(
    {
      extensions: [StarterKit, Placeholder],
      content,
      editorProps: {
        attributes: {
          class:
            "prose dark:prose-invert focus:outline-none h-full w-full max-w-full break-all",
        },
      },
    },
    [id],
  );

  const { updateNote } = useNote();

  useEffect(() => {
    if (!editor) return;

    const saveContent = () => {
      updateNote({ id, content: editor.getJSON() ?? null });
    };

    const debouncedSave = debounce(saveContent, 500);

    editor.on("update", () => {
      debouncedSave();
    });

    const handleBeforeUnload = () => {
      debouncedSave.flush();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [editor, id, updateNote]);

  return (
    <Tiptap editor={editor}>
      <Tiptap.Content className="p-4 mb-4 flex-1 w-full overflow-y-scroll" />
    </Tiptap>
  );
}
