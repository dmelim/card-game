import { DroppableSlot } from "../components/droppable-slot";
import { CardType } from "../types/card-types";
type Props = {
  board: (CardType | null)[];
};

export function PlayerBoard({ board }: Props) {
  console.log("Rendering PlayerBoard", board);
  return (
    <div className="flex gap-2">
      {board.map((card, i) => (
        <DroppableSlot key={i} index={i} card={card} />
      ))}
    </div>
  );
}
