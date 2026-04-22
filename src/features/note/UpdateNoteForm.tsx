import { TextField } from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useNote } from "./useNote";
import { useNoteAction } from "./useNoteAction";
import type { MainLayoutLoaderData } from "@/routes/loader";
import { useLoaderData } from "react-router";
import { useEffect } from "react";

export function UpdateNoteForm() {
  const { Form, result, errors } = useNote();
  const isMobile = useIsMobile();
  const id = useNoteAction((s) => s.id);
  const { notes } = useLoaderData<MainLayoutLoaderData>();
  const title = notes.find((n) => n.id === id)?.title;
  const close = useNoteAction((s) => s.close);

  useEffect(() => {
    if (result?.ok) {
      close();
    }
  }, [close, result]);

  if (!id || !title) {
    return null;
  }

  return (
    <Form
      className={cn("grid items-start gap-6", isMobile ? "p-4" : "")}
      method="POST"
      action="/note"
    >
      <Input name="intent" value="update" hidden readOnly />
      <Input name="id" value={id} hidden readOnly />
      <TextField
        label="Title"
        name="title"
        value={title}
        error={errors?.title}
      />
      <Button type="submit">Update</Button>
    </Form>
  );
}
