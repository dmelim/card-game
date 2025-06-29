import { create } from "zustand";
import { CardType } from "../types/card-types";
import { cardSet } from "../card-set";

type Turn = "player" | "enemy";

type Stats = {
  health: number;
  mana: number;
};

type MatchState = {
  player: Stats;
  enemy: Stats;
  turn: Turn;

  playerBoard: (CardType | null)[];
  enemyBoard: (CardType | null)[];
  selectedCard: CardType | null;
  selectedEnemyCard: CardType | null;

  playerHand: CardType[];
  enemyHand: CardType[];

  isEnemySelected: boolean;

  roundNumber: number;

  setHand: (target: "player" | "enemy", hand: CardType[]) => void;

  removeCardFromHand: (target: "player" | "enemy", cardId: string) => void;

  setTurn: (turn: Turn) => void;
  changeHealth: (target: "player" | "enemy", amount: number) => void;
  updateMana: (target: "player" | "enemy" | "both", delta: number) => void;

  addCardToBoard: (
    target: "player" | "enemy",
    card: CardType,
    index: number
  ) => void;

  removeCardFromBoard: (target: "player" | "enemy", cardId: string) => void;
  updateHasAttacked: (target: "player" | "enemy", cardId: string) => void;
  updateDefendeMode: () => void;

  setSelectedCard: (card: CardType | null) => void;
  setSelectedEnemyCard: (card: CardType | null) => void;

  cleanSelectedCards: () => void;

  resetHasAttacked: () => void;

  clearBoard: () => void;

  resetMatch: () => void;

  incrementRound: () => void;

  toggleEnemySelection: () => void;
};

export const useMatchStore = create<MatchState>((set) => ({
  player: { health: 30, mana: 1 },
  enemy: { health: 30, mana: 1 },
  turn: "player",

  playerBoard: [null, null, null, null],
  enemyBoard: [
    {
      id: "foxflame",
      name: "Foxflame Cub",
      image: "/foxflame.webp",
      attack: 1,
      mana: 1,
      element: "fire",
      description: "A fiery little beast with quick paws and quicker flames.",
      enemy: true,
    },

    null,
    null,
    null,
  ],

  playerHand: cardSet.slice(0, 5),
  enemyHand: cardSet.slice(0, 5),

  selectedCard: null,
  selectedEnemyCard: null,
  isEnemySelected: false,

  roundNumber: 1,

  setTurn: (turn) => set({ turn }),

  changeHealth: (target, amount) =>
    set((state) => ({
      [target]: {
        ...state[target],
        health: Math.max(0, state[target].health + amount),
      },
    })),
  setHand: (target, hand) =>
    set(() => ({
      [`${target}Hand`]: hand,
    })),
  removeCardFromHand: (target, cardId) =>
    set((state) => ({
      [`${target}Hand`]: state[`${target}Hand`].filter(
        (card) => card.id !== cardId
      ),
    })),
  updateMana: (target, delta) =>
    set((state) => {
      if (target === "both") {
        return {
          player: {
            ...state.player,
            mana: Math.max(0, state.player.mana + delta),
          },
          enemy: {
            ...state.enemy,
            mana: Math.max(0, state.enemy.mana + delta),
          },
        };
      }

      return {
        [target]: {
          ...state[target],
          mana: Math.max(0, state[target].mana + delta),
        },
      };
    }),

  addCardToBoard: (target, card, index) =>
    set((state) => {
      const board = [...state[`${target}Board`]];
      if (board[index]) return {};
      board[index] = { ...card, hasAttacked: false, defenseMode: false };
      return {
        [`${target}Board`]: board,
      };
    }),

  removeCardFromBoard: (target, cardId) =>
    set((state) => {
      const board = state[`${target}Board`].map((card) =>
        card?.id === cardId ? null : card
      );
      return {
        [`${target}Board`]: board,
      };
    }),

  updateHasAttacked: (target, cardId) =>
    set((state) => {
      const board = state[`${target}Board`].map((c) =>
        c?.id === cardId ? { ...c, hasAttacked: true } : c
      );
      return { [`${target}Board`]: board };
    }),

  resetHasAttacked: () =>
    set((state) => {
      const board = state.playerBoard.map((c) => {
        if (!c) return null;
        return {
          ...c,
          hasAttacked: false,
        };
      });
      return { playerBoard: board };
    }),

  updateDefendeMode: () =>
    set((state) => {
      const board = state.playerBoard.map((c) => {
        console.log("Updating defense mode", c);
        if (!c) return null;
        if (!c.hasAttacked) return { ...c, defenseMode: true };

        return c;
      });
      console.log(board);
      return { playerBoard: board };
    }),

  clearBoard: () =>
    set({
      playerBoard: [],
      enemyBoard: [],
    }),

  incrementRound: () =>
    set((state) => ({ roundNumber: state.roundNumber + 1 })),

  setSelectedCard: (card) =>
    set((state) => ({
      selectedCard: state.selectedCard?.id === card?.id ? null : card,
    })),

  setSelectedEnemyCard: (card) =>
    set((state) => ({
      selectedEnemyCard: state.selectedEnemyCard?.id === card?.id ? null : card,
    })),

  cleanSelectedCards: () =>
    set((state) => ({
      selectedCard: null,
      selectedEnemyCard: null,
      isEnemySelected: false,
    })),

  toggleEnemySelection: () =>
    set((state) => ({ isEnemySelected: !state.isEnemySelected })),

  resetMatch: () =>
    set({
      player: { health: 30, mana: 1 },
      enemy: { health: 30, mana: 1 },
      turn: "player",
      playerBoard: [null, null, null, null],
      enemyBoard: [null, null, null, null],
      playerHand: cardSet.slice(0, 5),
      enemyHand: cardSet.slice(0, 5),
      roundNumber: 1,
    }),
}));
