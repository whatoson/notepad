import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NoteMeta } from "@/types/note";
import { Trash2 } from "lucide-react";
import { Link, useParams, useSubmit } from "react-router";

interface NoteListItemProps {
  note: NoteMeta;
}

export function NoteListItem({ note }: NoteListItemProps) {
  const { noteId } = useParams();
  const submit = useSubmit();

  const isActive = noteId === note.id;
  const to = isActive ? "/" : `/note/${note.id}`;

  const handleDeleteClick = async () => {
    submit(
      {
        id: note.id,
        returnTo: noteId ?? "",
      },
      {
        action: `note/${note.id}`,
        method: "DELETE",
      },
    );
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link to={to}>{note.title}</Link>
      </SidebarMenuButton>
      <SidebarMenuAction onClick={handleDeleteClick}>
        <Trash2 /> <span className="sr-only">Delete note</span>
      </SidebarMenuAction>
    </SidebarMenuItem>
  );
}
