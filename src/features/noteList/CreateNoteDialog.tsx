import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateNoteForm } from "./CreateNoteForm";

export function CreateNoteDialog() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleClose = () => {
    setOpen(false);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <SidebarGroupAction>
            <Plus />
          </SidebarGroupAction>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Create note</DrawerTitle>
          </DrawerHeader>
          <CreateNoteForm className="p-4" onClose={handleClose} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction>
          <Plus />
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create note</DialogTitle>
        </DialogHeader>
        <CreateNoteForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
