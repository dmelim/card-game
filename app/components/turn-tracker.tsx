import { Button } from "@/components/ui/button";
import * as React from "react";

interface ITurnTrackerProps {
  currentTurn: string;
  currentRound: number;
  onEndTurn?: () => void;
}

const TurnTracker = ({
  currentTurn,
  onEndTurn,
  currentRound,
}: ITurnTrackerProps) => {
  const formattedTurn =
    currentTurn === "player" ? "Player's Turn" : "Enemy's Turn";
  return (
    <div className="flex flex-col items-end gap-2 text-right">
      <div className="text-sm text-slate-400 font-medium">
        Round {currentRound}
      </div>
      <h2 className="text-lg font-bold">{formattedTurn}</h2>
      <Button
        disabled={currentTurn !== "player"}
        onClick={onEndTurn}
        className="mt-2"
      >
        End Turn
      </Button>
    </div>
  );
};

export { TurnTracker };
