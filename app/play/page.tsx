"use client";

import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { PlayerBoard } from "../views/player-board";
import { PlayerHand } from "../views/player-hand";
import { Card } from "../components/Card";
import { cardSet } from "../card-set";
import { CardType } from "../types/card-types";
import { PlayerStats } from "../components/player-stats";
import { TurnTracker } from "../components/turn-tracker";
import { useMatchStore } from "../stores/match-store";
import { useGameEngine } from "../hooks/use-game-engine";

const enemyProfile = {
  name: "Monster",
  image: "https://picsum.photos/seed/monster/64",
};

const playerProfile = {
  name: "You",
  image: "https://picsum.photos/seed/player/64",
};

export default function PlayPage() {
  const playerBoard = useMatchStore((s) => s.playerBoard);
  const enemyBoard = useMatchStore((s) => s.enemyBoard);
  const addCardToBoard = useMatchStore((s) => s.addCardToBoard);
  const removeCardFromBoard = useMatchStore((s) => s.removeCardFromBoard);
  const playerHand = useMatchStore((s) => s.playerHand);
  const removeCardFromHand = useMatchStore((s) => s.removeCardFromHand);
  const updateMana = useMatchStore((s) => s.updateMana);
  const toggleEnemySelection = useMatchStore((s) => s.toggleEnemySelection);
  const isEnemySelected = useMatchStore((s) => s.isEnemySelected);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const turn = useMatchStore((s) => s.turn);
  const round = useMatchStore((s) => s.roundNumber);
  const playerStats = useMatchStore((s) => s.player);
  const enemyStats = useMatchStore((s) => s.enemy);

  const { endTurn } = useGameEngine();

  const enemy = {
    ...enemyProfile,
    health: enemyStats.health,
    mana: enemyStats.mana,
    enemy: true,
  };
  const player = {
    ...playerProfile,
    health: playerStats.health,
    mana: playerStats.mana,
  };

  function handleDragStart(event: any) {
    setActiveCardId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return setActiveCardId(null);

    const fromIndex = active.data.current?.index;
    const toIndex = parseInt(over.id.replace("slot-", ""));
    if (isNaN(toIndex)) return;

    const card = playerHand[fromIndex];
    if (!card) return;

    const playerBoard = useMatchStore.getState().playerBoard;
    if (playerBoard[toIndex]) return;

    updateMana("player", -card.mana);

    addCardToBoard("player", card, toIndex);

    removeCardFromHand("player", card.id);

    setActiveCardId(null);
  }

  const activeCard = playerHand.find((c) => c.id === activeCardId);

  return (
    <main className="min-h-screen flex flex-col items-center justify-between px-4 py-6 gap-6">
      <div className="w-full flex justify-between items-center px-4">
        <PlayerStats
          {...enemy}
          canAttack={
            enemyBoard.filter((c) => c !== null).length === 0 &&
            playerBoard.filter((c) => c !== null).length > 0
          }
          isSelected={isEnemySelected}
          onClick={toggleEnemySelection}
        />
        <TurnTracker
          currentTurn={turn}
          onEndTurn={endTurn}
          currentRound={round}
        />
      </div>

      <PlayerBoard board={enemyBoard} enemy={true} />

      <div className="w-full h-1 my-4 bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 rounded-full" />

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <PlayerBoard board={playerBoard} enemy={false} />
        <PlayerHand hand={playerHand} activeCardId={activeCardId} />
        <DragOverlay>
          {activeCard ? <Card {...activeCard} isSelected={false} /> : null}
        </DragOverlay>
      </DndContext>

      <div className="w-full flex justify-start px-4">
        <PlayerStats {...player} canAttack={false} isSelected={false} />
      </div>
    </main>
  );
}
