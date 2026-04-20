import { Placeholder } from "@tiptap/extensions";
import { Tiptap, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./editor.css";
import { useEffect } from "react";
import { localNotesRepository } from "@/services/localNotesRepository";
import { debounce } from "lodash-es";
import { useNoteList } from "../noteList/useNoteList";
import { toast } from "sonner";

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
  const refresh = useNoteList((s) => s.refresh);

  useEffect(() => {
    if (!editor) return;

    const saveContent = async () => {
      try {
        await localNotesRepository.updateNote({
          id,
          content: editor.getJSON(),
        });
      } catch (error) {
        toast.error("Failed to save a note");
        return;
      }
      await refresh();
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
      debouncedSave.flush();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editor, id, refresh]);

  return (
    <Tiptap editor={editor}>
      <Tiptap.Content className="flex-1 w-full overflow-y-auto p-4" />
    </Tiptap>
  );
}
