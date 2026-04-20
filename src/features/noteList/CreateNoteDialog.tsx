import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import { CreateNoteForm } from "./CreateNoteForm";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CREATE_NOTE_CONTENT = {
  title: "Create note",
  description: "Enter a title for your note",
};

export function CreateNoteDialog() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigation = useNavigation();
  const isRedirecting =
    navigation.state === "loading" && navigation.formData !== undefined;

  useEffect(() => {
    if (isRedirecting) {
      setOpen(false);
    }
  }, [isRedirecting]);

  if (isMobile) {
    return <MobileDialog open={open} setOpen={setOpen} />;
  }

  return <DesktopDialog open={open} setOpen={setOpen} />;
}

function MobileDialog({ open, setOpen }: DialogProps) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <SidebarGroupAction>
          <Plus />
        </SidebarGroupAction>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{CREATE_NOTE_CONTENT.title}</DrawerTitle>
          <DrawerDescription>
            {CREATE_NOTE_CONTENT.description}
          </DrawerDescription>
        </DrawerHeader>
        <CreateNoteForm className="p-4" />
      </DrawerContent>
    </Drawer>
  );
}

function DesktopDialog({ open, setOpen }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction>
          <Plus />
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{CREATE_NOTE_CONTENT.title}</DialogTitle>
          <DialogDescription>
            {CREATE_NOTE_CONTENT.description}
          </DialogDescription>
        </DialogHeader>
        <CreateNoteForm />
      </DialogContent>
    </Dialog>
  );
}
