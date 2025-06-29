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
  const isEnemySelected = useMatchStore((s) => s.isEnemySelected);
  const resetHasAttacked = useMatchStore((s) => s.resetHasAttacked);
  const updateHasAttacked = useMatchStore((s) => s.updateHasAttacked);
  const updateDefendeMode = useMatchStore((s) => s.updateDefendeMode);

  const manaMap = (round: number) => {
    return round <= 3 ? 1 : round <= 6 ? 2 : 3;
  };

  const onEndTurn = () => {
    incrementRound();

    updateMana(
      "player",
      manaMap(round) + playerBoard.filter((card) => card !== null).length
    );
    updateMana(
      "enemy",
      manaMap(round) + enemyBoard.filter((card) => card !== null).length
    );
    resetHasAttacked();
  };

  useEffect(() => {
    if (turn === "enemy") {
      updateDefendeMode();
      const timer = setTimeout(() => {
        onEndTurn();
        setTurn("player");
      }, 5000);

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
        updateHasAttacked("player", selectedCard.id);

        cleanSelectedCards();
      }
      if (isEnemySelected && selectedCard) {
        changeHealth("enemy", -selectedCard.attack);
        cleanSelectedCards();
        updateHasAttacked("player", selectedCard.id);
      }
    }
  }, [turn, selectedCard, selectedEnemyCard, isEnemySelected]);

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
