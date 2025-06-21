import { useDroppable } from "@dnd-kit/core";
import { Card } from "./Card";
import { cardSet } from "../card-set";

type Props = {
  index: number;
  card: (typeof cardSet)[0] | null;
};

export function DroppableSlot({ index, card }: Props) {
  const { setNodeRef } = useDroppable({ id: `slot-${index}` });

  return (
    <div ref={setNodeRef}>
      {card ? (
        <Card {...card} />
      ) : (
        <div className="w-48 h-72 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/30" />
      )}
    </div>
  );
}
