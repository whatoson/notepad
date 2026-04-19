import { Empty, EmptyTitle } from "@/components/ui/empty";

export function NotFoundPage() {
  return (
    <Empty className="border border-dashed">
      <EmptyTitle>Not found...</EmptyTitle>
    </Empty>
  );
}
