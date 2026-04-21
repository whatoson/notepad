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
import { useIsMobile } from "@/hooks/use-mobile";
import { CreateNoteForm } from "./CreateNoteForm";
import { useCreateNoteDialog } from "./useCreateNoteDialog";
import { useSidebar } from "@/components/ui/sidebar";

export function CreateNoteDialog() {
  const isMobile = useIsMobile();
  const isOpen = useCreateNoteDialog((s) => s.isOpen);
  const close = useCreateNoteDialog((s) => s.close);

  if (isMobile) {
    return <MobileDialog isOpen={isOpen} close={close} />;
  }

  return <DesktopDialog isOpen={isOpen} close={close} />;
}

interface DialogProps {
  isOpen: boolean;
  close: () => void;
}

function MobileDialog({ isOpen, close }: DialogProps) {
  const { setOpenMobile } = useSidebar();
  if (isOpen) {
    setOpenMobile(false);
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && close()}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create note</DrawerTitle>
          <DrawerDescription>Enter a title for your note</DrawerDescription>
        </DrawerHeader>
        <CreateNoteForm className="p-4" />
      </DrawerContent>
    </Drawer>
  );
}

function DesktopDialog({ isOpen, close }: DialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create note</DialogTitle>
          <DialogDescription>Enter a title for your note</DialogDescription>
        </DialogHeader>
        <CreateNoteForm />
      </DialogContent>
    </Dialog>
  );
}
