import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "./Card";
import { cardSet } from "../card-set";
import { useMatchStore } from "../stores/match-store";

type Props = {
  card: (typeof cardSet)[0];
  index: number;
  activeCardId: string | null;
};

export function DraggableCard({ card, index, activeCardId }: Props) {
  const { turn } = useMatchStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
    data: { index },
  });

  const isDragging = activeCardId === card.id;
  const disabled = turn !== "player";

  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: disabled ? "not-allowed" : "grab",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(!disabled ? listeners : {})}
      {...(!disabled ? attributes : {})}
      className={isDragging ? "opacity-0" : ""}
    >
      <Card {...card} disabled={disabled} />
    </div>
  );
}
