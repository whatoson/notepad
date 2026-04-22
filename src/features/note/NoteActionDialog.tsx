import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useSidebar } from "@/components/ui/sidebar";
import { CreateNoteForm } from "./CreateNoteForm";
import { useNoteAction, type ModalType } from "./useNoteAction";
import { useIsMobile } from "@/hooks/use-mobile";
import { UpdateNoteForm } from "./UpdateNoteForm";
import { DeleteNoteForm } from "./DeleteNoteForm";

export function NoteActionDialog() {
  const modal = useNoteAction((s) => s.modal);
  const close = useNoteAction((s) => s.close);
  const isMobile = useIsMobile();
  const isOpen = modal !== null;

  if (isMobile) {
    return <MobileDialog modal={modal} isOpen={isOpen} close={close} />;
  }

  return <DesktopDialog modal={modal} isOpen={isOpen} close={close} />;
}

interface DialogProps {
  modal: ModalType | null;
  isOpen: boolean;
  close: () => void;
}

function MobileDialog({ modal, isOpen, close }: DialogProps) {
  const { setOpenMobile } = useSidebar();
  if (isOpen) {
    setOpenMobile(false);
  }

  const content = ModalContent(modal);

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && close()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{content.title}</DrawerTitle>
          <DrawerDescription>{content.description}</DrawerDescription>
        </DrawerHeader>
        {modal === "create" && <CreateNoteForm />}
        {modal === "update" && <UpdateNoteForm />}
        {modal === "delete" && <DeleteNoteForm />}
      </DrawerContent>
    </Drawer>
  );
}

function DesktopDialog({ modal, isOpen, close }: DialogProps) {
  const content = ModalContent(modal);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>
        {modal === "create" && <CreateNoteForm />}
        {modal === "update" && <UpdateNoteForm />}
        {modal === "delete" && <DeleteNoteForm />}
      </DialogContent>
    </Dialog>
  );
}

function ModalContent(modal: ModalType | null): {
  title: string;
  description: string;
} {
  switch (modal) {
    case "create":
      return {
        title: "Create note",
        description: "Enter a title for your note",
      };
    case "update":
      return {
        title: "Update note",
        description: "Update a title for your note",
      };
    case "delete":
      return {
        title: "Delete note",
        description: "Are you sure?",
      };
    default:
      return {
        title: "",
        description: "",
      };
  }
}
