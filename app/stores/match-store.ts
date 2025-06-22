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

  playerHand: CardType[];
  enemyHand: CardType[];

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

  removeCardFromBoard: (target: "player" | "enemy", index: number) => void;

  clearBoard: () => void;

  resetMatch: () => void;

  incrementRound: () => void;
};

export const useMatchStore = create<MatchState>((set) => ({
  player: { health: 30, mana: 1 },
  enemy: { health: 30, mana: 1 },
  turn: "player",

  playerBoard: [null, null, null, null],
  enemyBoard: [null, null, null, null],

  playerHand: cardSet.slice(0, 5),
  enemyHand: cardSet.slice(0, 5),

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
      board[index] = card;
      return {
        [`${target}Board`]: board,
      };
    }),

  removeCardFromBoard: (target, index) =>
    set((state) => {
      const board = [...state[`${target}Board`]];
      board[index] = null;
      return {
        [`${target}Board`]: board,
      };
    }),

  clearBoard: () =>
    set({
      playerBoard: [],
      enemyBoard: [],
    }),

  incrementRound: () =>
    set((state) => ({ roundNumber: state.roundNumber + 1 })),

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
