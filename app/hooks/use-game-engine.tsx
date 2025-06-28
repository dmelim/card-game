import { useEffect } from "react";
import { useMatchStore } from "../stores/match-store";

export function useGameEngine() {
  const turn = useMatchStore((s) => s.turn);
  const player = useMatchStore((s) => s.player);
  const enemy = useMatchStore((s) => s.enemy);
  const setTurn = useMatchStore((s) => s.setTurn);
  const changeHealth = useMatchStore((s) => s.changeHealth);
  const updateMana = useMatchStore((s) => s.updateMana);
  const incrementRound = useMatchStore((s) => s.incrementRound);
  const playerBoard = useMatchStore((s) => s.playerBoard);
  const enemyBoard = useMatchStore((s) => s.enemyBoard);
  const round = useMatchStore((s) => s.roundNumber);
  const selectedCard = useMatchStore((s) => s.selectedCard);
  const selectedEnemyCard = useMatchStore((s) => s.selectedEnemyCard);
  const removeCardFromBoard = useMatchStore((s) => s.removeCardFromBoard);
  const cleanSelectedCards = useMatchStore((s) => s.cleanSelectedCards);

  const manaMap = (round: number) => {
    return round <= 3 ? 1 : round <= 6 ? 2 : 3;
  };

  const onEndTurn = () => {
    incrementRound();
    console.log(playerBoard.length, enemyBoard.length);
    updateMana(
      "player",
      manaMap(round) + playerBoard.filter((card) => card !== null).length
    );
    updateMana(
      "enemy",
      manaMap(round) + enemyBoard.filter((card) => card !== null).length
    );
  };

  useEffect(() => {
    if (turn === "enemy") {
      const timer = setTimeout(() => {
        onEndTurn();
        setTurn("player");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [turn]);

  useEffect(() => {
    if (turn === "player") {
      if (selectedCard && selectedEnemyCard) {
        if (selectedCard.attack > selectedEnemyCard.attack) {
          removeCardFromBoard("enemy", selectedEnemyCard?.id);
        }
        if (selectedCard.attack < selectedEnemyCard.attack) {
          removeCardFromBoard("player", selectedCard?.id);
        }
        if (selectedCard?.attack === selectedEnemyCard?.attack) {
          removeCardFromBoard("player", selectedCard?.id);
          removeCardFromBoard("enemy", selectedEnemyCard?.id);
        }
        cleanSelectedCards();
      }
    }
  }, [turn, selectedCard, selectedEnemyCard]);

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
