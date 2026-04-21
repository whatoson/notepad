import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Bug } from "lucide-react";
import { useRouteError } from "react-router";

export function ErrorPage() {
  const error = useRouteError();
  const errorMessage = error instanceof Error ? error.message : "Unknown error";

  return (
    <div className="p-4">
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia>
            <Bug />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>{errorMessage}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
