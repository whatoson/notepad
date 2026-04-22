import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { NoteMeta } from "@/types/note";
import { Link, useParams } from "react-router";
import { useNoteAction } from "../note/useNoteAction";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";

interface NoteListItemProps {
  note: NoteMeta;
}

export function NoteListItem({ note }: NoteListItemProps) {
  const { noteId } = useParams();
  const { setOpenMobile } = useSidebar();
  const open = useNoteAction((s) => s.open);

  const isActive = noteId === note.id;

  const handleDelete = () => {
    open("delete", note.id);
  };

  const handleEdit = () => {
    open("update", note.id);
  };

  return (
    <div className="relative flex justify-between items-center">
      <Link
        className={cn(
          "flex w-full h-full gap-2 rounded-lg px-3 py-2 hover:bg-accent ring-sidebar-ring outline-hidden focus-visible:ring-2",
          isActive ? "bg-accent" : "",
        )}
        to={isActive ? "/" : `/note/${note.id}`}
        onClick={() => setOpenMobile(false)}
      >
        <div className="flex flex-col items-start min-w-0 w-[60%]">
          <span className="truncate w-full">{note.title}</span>
          <span className="text-muted-foreground text-xs">
            {new Date(note.updatedAt).toLocaleString()}
          </span>
        </div>
      </Link>
      <div className="flex absolute right-1 gap-1">
        <Button variant="secondary" size="icon-sm" onClick={handleEdit}>
          <Pen />
        </Button>
        <Button variant="destructive" size="icon-sm" onClick={handleDelete}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
