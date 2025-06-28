import { useDroppable } from "@dnd-kit/core";
import { Card } from "./Card";
import { cardSet } from "../card-set";
import { CardType } from "../types/card-types";

type Props = {
  index: number;
  card: (typeof cardSet)[0] | null;
  onClick: (card: CardType) => void;
  isSelected: boolean;
  enemy?: boolean;
};

export function DroppableSlot({
  index,
  card,
  onClick,
  isSelected,
  enemy,
}: Props) {
  const { setNodeRef } = useDroppable({
    id: `slot-${index}`,
  });

  return (
    <div ref={setNodeRef} onClick={() => onClick(card)}>
      {card ? (
        <Card {...card} isSelected={isSelected} enemy={card.enemy} />
      ) : (
        <div
          className={`w-48 h-72 rounded-xl bg-slate-800/30 border-2 border-dashed border-slate-600`}
        />
      )}
    </div>
  );
}
