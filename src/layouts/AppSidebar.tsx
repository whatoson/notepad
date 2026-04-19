import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NoteList } from "@/features/noteList/NoteList";

interface AppSidebarProps {
  variant?: "inset" | "sidebar" | "floating" | undefined;
}

export function AppSidebar({ variant }: AppSidebarProps) {
  return (
    <Sidebar variant={variant}>
      <SidebarContent>
        <NoteList />
      </SidebarContent>
    </Sidebar>
  );
}
