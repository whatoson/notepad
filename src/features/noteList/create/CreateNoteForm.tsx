import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Form } from "react-router";

export function CreateNoteForm({ className }: React.ComponentProps<"form">) {
  return (
    <Form
      className={cn("grid items-start gap-6", className)}
      method="POST"
      action="/note"
    >
      <Input name="title" placeholder="Title" autoComplete="off" />
      <Button type="submit">Create</Button>
    </Form>
  );
}
