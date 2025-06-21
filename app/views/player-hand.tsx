import { cardSet } from "../card-set";
import { DraggableCard } from "../components/draggable-card";

type Props = {
  hand: (typeof cardSet)[0][];
  activeCardId: string | null;
};

export function PlayerHand({ hand, activeCardId }: Props) {
  return (
    <div className="flex gap-2 mt-4">
      {hand.map((card, i) => (
        <DraggableCard
          key={card.id}
          card={card}
          index={i}
          activeCardId={activeCardId}
        />
      ))}
    </div>
  );
}
