import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNote } from "@/features/note/useNote";
import { cn } from "@/lib/utils";
import { useCreateNoteDialog } from "./useCreateNoteDialog";
import { useEffect } from "react";

export function CreateNoteForm({ className }: React.ComponentProps<"form">) {
  const { Form, result, errors } = useNote();
  const close = useCreateNoteDialog((s) => s.close);

  useEffect(() => {
    if (result?.ok) {
      close();
    }
  }, [close, result]);

  return (
    <Form
      className={cn("grid items-start gap-6", className)}
      method="POST"
      action="/note"
    >
      <Input name="intent" value="create" hidden readOnly />
      <Field data-invalid={errors?.title ? true : undefined}>
        <FieldLabel>Title</FieldLabel>
        <Input
          name="title"
          autoComplete="off"
          aria-invalid={errors?.title ? true : undefined}
        />
        {errors?.title && <FieldError>{errors?.title}</FieldError>}
      </Field>
      <Button type="submit">Create</Button>
    </Form>
  );
}
