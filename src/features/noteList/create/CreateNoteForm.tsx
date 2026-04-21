import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/routes/note/action";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { useCreateNoteDialog } from "./useCreateNoteDialog";

export function CreateNoteForm({ className }: React.ComponentProps<"form">) {
  const fetcher = useFetcher();
  const result = fetcher.data as ActionResult | undefined;
  const close = useCreateNoteDialog((s) => s.close);

  useEffect(() => {
    if (result?.ok) {
      close();
    }
  }, [close, result?.ok]);

  return (
    <fetcher.Form
      className={cn("grid items-start gap-6", className)}
      method="POST"
      action="/note"
    >
      <Field data-invalid={result?.errors?.title ? true : undefined}>
        <FieldLabel>Title</FieldLabel>
        <Input
          name="title"
          autoComplete="off"
          aria-invalid={result?.errors?.title ? true : undefined}
        />
        {result?.errors?.title && (
          <FieldError>{result?.errors?.title}</FieldError>
        )}
      </Field>
      <Button type="submit">Create</Button>
    </fetcher.Form>
  );
}
