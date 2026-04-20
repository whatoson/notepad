import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLoaderData, useParams } from "react-router";
import type { MainLayoutLoaderData } from "./MainLayout";

export function Header() {
  const { noteId } = useParams();
  const { notes } = useLoaderData<MainLayoutLoaderData>();

  const note = notes.find((n) => n.id === noteId);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <p>{note ? note.title : "Notepad"}</p>
    </header>
  );
}
