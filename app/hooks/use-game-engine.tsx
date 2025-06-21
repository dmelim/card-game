import { useEffect } from "react";
import { useMatchStore } from "../stores/match-store";

export function useGameEngine() {
  const turn = useMatchStore((s) => s.turn);
  const player = useMatchStore((s) => s.player);
  const enemy = useMatchStore((s) => s.enemy);
  const setTurn = useMatchStore((s) => s.setTurn);
  const changeHealth = useMatchStore((s) => s.changeHealth);
  const incrementRound = useMatchStore((s) => s.incrementRound);

  useEffect(() => {
    if (turn === "enemy") {
      const timer = setTimeout(() => {
        console.log("Enemy attacks!");
        incrementRound();
        setTurn("player");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [turn]);

  useEffect(() => {
    if (player.health <= 0) {
      alert("You lost!");
    } else if (enemy.health <= 0) {
      alert("You win!");
    }
  }, [player.health, enemy.health]);

  return {
    endTurn: () => {
      setTurn(turn === "player" ? "enemy" : "player");
    },
  };
}
