import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NoteMeta } from "@/types/note";
import { Trash2 } from "lucide-react";
import { Link, useParams } from "react-router";

interface NoteListItemProps {
  note: NoteMeta;
}

export function NoteListItem({ note }: NoteListItemProps) {
  const { noteId } = useParams();

  const isActive = noteId === note.id;
  const to = isActive ? "/" : `/note/${note.id}`;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link to={to}>{note.title}</Link>
      </SidebarMenuButton>
      <SidebarMenuAction>
        <Trash2 /> <span className="sr-only">Delete note</span>
      </SidebarMenuAction>
    </SidebarMenuItem>
  );
}
