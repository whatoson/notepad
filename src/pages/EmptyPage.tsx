import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { NotebookPen } from "lucide-react";

export function EmptyPage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <NotebookPen />
        </EmptyMedia>
        <EmptyTitle>Select a note</EmptyTitle>
        <EmptyDescription>
          Choose a note from the sidebar or create a new one
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
