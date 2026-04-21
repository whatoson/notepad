import { localNotesRepository } from "@/services/localNotesRepository";
import { Placeholder } from "@tiptap/extensions";
import { Tiptap, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { debounce } from "lodash-es";
import { useEffect } from "react";
import { toast } from "sonner";
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

  useEffect(() => {
    if (!editor) return;

    const saveContent = async () => {
      try {
        await localNotesRepository.updateNote({
          id,
          content: editor.getJSON(),
        });
      } catch {
        toast.error("Failed to save a note");
      }
    };

    const debouncedSave = debounce(saveContent, 500);

    editor.on("update", async () => {
      await debouncedSave();
    });

    const handleBeforeUnload = () => {
      debouncedSave.flush()?.catch((reason) => {
        toast.error(`Failed to save: ${reason}`);
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [editor, id]);

  return (
    <Tiptap editor={editor}>
      <Tiptap.Content className="flex-1 w-full overflow-y-scroll" />
    </Tiptap>
  );
}
