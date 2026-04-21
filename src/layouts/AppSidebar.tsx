import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NoteList } from "@/features/noteList/NoteList";
import type { MainLayoutLoaderData } from "@/routes/loader";
import { useLoaderData } from "react-router";

interface Props {
  variant?: "inset" | "sidebar" | "floating" | undefined;
}

export function AppSidebar({ variant }: Props) {
  const { notes } = useLoaderData<MainLayoutLoaderData>();

  return (
    <Sidebar variant={variant}>
      <SidebarContent>
        <NoteList notes={notes} />
      </SidebarContent>
    </Sidebar>
  );
}
