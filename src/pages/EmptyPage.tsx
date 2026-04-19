import { Empty, EmptyTitle } from "@/components/ui/empty";

export function EmptyPage() {
  return (
    <Empty className="border border-dashed">
      <EmptyTitle>Select a note...</EmptyTitle>
    </Empty>
  );
}
