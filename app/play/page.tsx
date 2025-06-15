// app/play/page.tsx
"use client";

import { useState } from "react";
import { cardSet } from "../card-set";
import { Card } from "../components/Card";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function DraggableCard({
  card,
  index,
  activeCardId,
}: {
  card: (typeof cardSet)[0];
  index: number;
  activeCardId: string | null;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
    data: { index },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const isDragging = activeCardId === card.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? "opacity-0" : ""}
    >
      <Card {...card} />
    </div>
  );
}

function DroppableSlot({
  index,
  card,
  onDrop,
}: {
  index: number;
  card: (typeof cardSet)[0] | null;
  onDrop: (index: number, cardId: string) => void;
}) {
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

export default function PlayPage() {
  const [playerHand, setPlayerHand] = useState(cardSet.slice(0, 5));
  const [playerBoard, setPlayerBoard] = useState<(typeof cardSet)[0][]>([
    null,
    null,
    null,
    null,
  ]);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  function handleDragStart(event: any) {
    setActiveCardId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) {
      setActiveCardId(null);
      return;
    }

    const fromIndex = active.data.current?.index;
    const toSlotIndex = parseInt(over.id.replace("slot-", ""));
    if (isNaN(toSlotIndex)) return;

    const card = playerHand[fromIndex];
    if (!card || playerBoard[toSlotIndex]) return;

    const newBoard = [...playerBoard];
    newBoard[toSlotIndex] = card;

    const newHand = [...playerHand];
    newHand.splice(fromIndex, 1);

    setPlayerBoard(newBoard);
    setPlayerHand(newHand);
    setActiveCardId(null);
  }

  const activeCard = playerHand.find((c) => c.id === activeCardId);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-6 gap-6">
      <div className="flex gap-2 opacity-50">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-48 h-72 bg-slate-800/20 rounded-xl" />
        ))}
      </div>

      <div className="w-full h-1 my-4 bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 rounded-full" />

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-2">
          {playerBoard.map((card, i) => (
            <DroppableSlot key={i} index={i} card={card} onDrop={() => {}} />
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          {playerHand.map((card, i) => (
            <DraggableCard
              key={card.id}
              card={card}
              index={i}
              activeCardId={card.id}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? <Card {...activeCard} /> : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
}
