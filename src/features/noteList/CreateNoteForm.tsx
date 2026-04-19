import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNoteList } from "./useNoteList";

export function CreateNoteForm({
  className,
  onClose,
}: React.ComponentProps<"form"> & { onClose: () => void }) {
  const createNote = useNoteList((state) => state.createNote);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString();

    if (!title || title.trim().length === 0) {
      toast.error("Title is required");
      return;
    }

    try {
      await createNote({ title });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create note");
    }
  };

  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={handleSubmit}
    >
      <Input name="title" placeholder="Title" autoComplete="off" />
      <Button type="submit">Create</Button>
    </form>
  );
}
