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
    <Empty className="border border-dashed m-4">
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
