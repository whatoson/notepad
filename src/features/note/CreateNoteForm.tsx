import { TextField } from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useNote } from "./useNote";
import { useNoteAction } from "./useNoteAction";
import { useEffect } from "react";

export function CreateNoteForm() {
  const { Form, result, errors } = useNote();
  const close = useNoteAction((s) => s.close);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (result?.ok) {
      close();
    }
  }, [close, result]);

  return (
    <Form
      className={cn("grid items-start gap-6", isMobile ? "p-4" : "")}
      method="POST"
      action="/note"
    >
      <Input name="intent" value="create" hidden readOnly />
      <TextField label="Title" name="title" error={errors?.title} />
      <Button type="submit">Create</Button>
    </Form>
  );
}
