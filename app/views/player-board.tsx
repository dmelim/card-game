import { useEffect } from "react";
import { DroppableSlot } from "../components/droppable-slot";
import { useMatchStore } from "../stores/match-store";
import { CardType } from "../types/card-types";
type Props = {
  board: (CardType | null)[];
  enemy?: boolean;
};

export function PlayerBoard({ board, enemy }: Props) {
  const setSelectedCard = useMatchStore((get) => get.setSelectedCard);
  const selectedCard = useMatchStore((get) => get.selectedCard);
  const setSelectedEnemyCard = useMatchStore((get) => get.setSelectedEnemyCard);
  const selectedEnemyCard = useMatchStore((get) => get.selectedEnemyCard);
  const onClick = (card: CardType) => {
    enemy ? setSelectedEnemyCard(card) : setSelectedCard(card);
  };
  useEffect(() => {}, [selectedCard, selectedEnemyCard]);

  return (
    <div className="flex gap-2">
      {board.map((card, i) => (
        <DroppableSlot
          key={i}
          index={i}
          card={card}
          onClick={onClick}
          isSelected={
            enemy && card?.enemy
              ? selectedEnemyCard !== null && selectedEnemyCard?.id === card?.id
              : selectedCard !== null && selectedCard?.id === card?.id
          }
          enemy={enemy}
        />
      ))}
    </div>
  );
}
