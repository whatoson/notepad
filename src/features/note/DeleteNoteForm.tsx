import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useNote } from "./useNote";
import { useNoteAction } from "./useNoteAction";
import { useEffect } from "react";

export function DeleteNoteForm() {
  const { Form, result } = useNote();
  const isMobile = useIsMobile();
  const id = useNoteAction((s) => s.id);
  const close = useNoteAction((s) => s.close);

  useEffect(() => {
    if (result?.ok) {
      close();
    }
  }, [close, result]);

  if (!id) {
    return null;
  }

  return (
    <Form
      className={cn("grid items-start gap-6", isMobile ? "p-4" : "")}
      method="POST"
      action="/note"
    >
      <Input name="intent" value="delete" hidden readOnly />
      <Input name="id" value={id} hidden readOnly />
      <Button type="submit">Delete</Button>
    </Form>
  );
}
