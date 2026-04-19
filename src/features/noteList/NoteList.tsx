import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { CreateNoteDialog } from "./CreateNoteDialog";
import { NoteListItem } from "./NoteListItem";
import { useNoteList } from "./useNoteList";

export function NoteList() {
  const notes = useNoteList((state) => state.notes);
  const refresh = useNoteList((state) => state.refresh);

  useEffect(() => {
    refresh();
  }, [refresh]);

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
