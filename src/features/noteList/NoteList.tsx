import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import type { NoteMeta } from "@/types/note";
import { Plus } from "lucide-react";
import { NoteListItem } from "./NoteListItem";
import { useCreateNoteDialog } from "./create/useCreateNoteDialog";

interface Props {
  notes: NoteMeta[];
}

export function NoteList({ notes }: Props) {
  const openCreateNoteDialog = useCreateNoteDialog((s) => s.open);

  return (
    <SidebarGroup className="grow">
      <SidebarGroupLabel>Notes</SidebarGroupLabel>
      <SidebarGroupAction onClick={openCreateNoteDialog}>
        <Plus />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {notes.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
