import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import type { NoteMeta } from "@/types/note";
import { Plus } from "lucide-react";
import { useNoteAction } from "../note/useNoteAction";
import { NoteListItem } from "./NoteListItem";

interface Props {
  notes: NoteMeta[];
}

export function NoteList({ notes }: Props) {
  const open = useNoteAction((s) => s.open);
  const handleCreate = () => {
    open("create");
  };

  return (
    <SidebarGroup className="grow">
      <SidebarGroupLabel>Notes</SidebarGroupLabel>
      <SidebarGroupAction onClick={handleCreate}>
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
