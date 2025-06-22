"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "./Card";
import { cardSet } from "../card-set";
import { useMatchStore } from "../stores/match-store";
import { cn } from "@/lib/utils";
import { Droplet, Ban } from "lucide-react";

type Props = {
  card: (typeof cardSet)[0];
  index: number;
  activeCardId: string | null;
};

export function DraggableCard({ card, index, activeCardId }: Props) {
  const turn = useMatchStore((s) => s.turn);
  const mana = useMatchStore((s) => s.player.mana);
  const manaCost = card.mana;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
    data: { index },
  });

  const isDragging = activeCardId === card.id;
  const noMana = mana < manaCost;
  const disabled = turn !== "player" || noMana;

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
      className={cn(
        "relative transition-opacity",
        isDragging && "opacity-0",
        disabled && mana < manaCost && "brightness-90"
      )}
    >
      <Card {...card} disabled={disabled} />
      {disabled && noMana && (
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-white bg-red-600/80 rounded-full backdrop-blur-sm shadow-sm">
          <Ban size={14} className="text-white opacity-80" />
          <span>Not enough mana</span>
        </div>
      )}
    </div>
  );
}
