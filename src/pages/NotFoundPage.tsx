import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ghost } from "lucide-react";

export function NotFoundPage() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <Ghost />
        </EmptyMedia>
        <EmptyTitle>Not found</EmptyTitle>
        <EmptyDescription>
          The page you are looking for does not exist
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
