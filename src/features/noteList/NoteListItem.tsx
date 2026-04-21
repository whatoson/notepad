import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { NoteMeta } from "@/types/note";
import { Trash2 } from "lucide-react";
import { Link, useParams } from "react-router";
import { useNote } from "../note/useNote";

interface NoteListItemProps {
  note: NoteMeta;
}

export function NoteListItem({ note }: NoteListItemProps) {
  const { noteId } = useParams();
  const { deleteNote } = useNote();
  const { setOpenMobile } = useSidebar();

  const isActive = noteId === note.id;

  const handleDelete = () => {
    deleteNote({ id: note.id });
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link
          to={isActive ? "/" : `/note/${note.id}`}
          onClick={() => setOpenMobile(false)}
        >
          {note.title}
        </Link>
      </SidebarMenuButton>
      <SidebarMenuAction onClick={handleDelete}>
        <Trash2 /> <span className="sr-only">Delete note</span>
      </SidebarMenuAction>
    </SidebarMenuItem>
  );
}
