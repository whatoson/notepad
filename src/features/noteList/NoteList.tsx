import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import type { NoteMeta } from "@/types/note";
import { CreateNoteDialog } from "./CreateNoteDialog";
import { NoteListItem } from "./NoteListItem";

interface Props {
  notes: NoteMeta[];
}

export function NoteList({ notes }: Props) {
  return (
    <SidebarGroup className="grow">
      <SidebarGroupLabel>Notes</SidebarGroupLabel>
      <CreateNoteDialog />
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
