import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NoteMeta } from "@/types/note";
import { Trash2 } from "lucide-react";
import { Link, useParams } from "react-router";
import { useNoteList } from "./useNoteList";

interface NoteListItemProps {
  note: NoteMeta;
}

export function NoteListItem({ note }: NoteListItemProps) {
  const { noteId } = useParams();
  const deleteNote = useNoteList((state) => state.deleteNote);

  const isActive = noteId === note.id;
  const to = isActive ? "/" : `/note/${note.id}`;

  const handleDeleteClick = async () => {
    await deleteNote(note.id);
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
