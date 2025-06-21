import { create } from "zustand";

type Turn = "player" | "enemy";

type Stats = {
  health: number;
  mana: number;
};

type MatchState = {
  player: Stats;
  enemy: Stats;
  turn: Turn;

  playerBoard: string[];
  enemyBoard: string[];

  roundNumber: number;

  setTurn: (turn: Turn) => void;
  changeHealth: (target: "player" | "enemy", amount: number) => void;
  changeMana: (target: "player" | "enemy", amount: number) => void;

  addCardToBoard: (target: "player" | "enemy", cardId: string) => void;
  removeCardFromBoard: (target: "player" | "enemy", cardId: string) => void;
  clearBoard: () => void;

  resetMatch: () => void;

  incrementRound: () => void;
};

export const useMatchStore = create<MatchState>((set) => ({
  player: { health: 30, mana: 0 },
  enemy: { health: 30, mana: 0 },
  turn: "player",

  playerBoard: [],
  enemyBoard: [],

  roundNumber: 1,

  setTurn: (turn) => set({ turn }),

  changeHealth: (target, amount) =>
    set((state) => ({
      [target]: {
        ...state[target],
        health: Math.max(0, state[target].health + amount),
      },
    })),

  changeMana: (target, amount) =>
    set((state) => ({
      [target]: {
        ...state[target],
        mana: Math.max(0, state[target].mana + amount),
      },
    })),

  addCardToBoard: (target, cardId) =>
    set((state) => ({
      [`${target}Board`]: [...state[`${target}Board`], cardId],
    })),

  removeCardFromBoard: (target, cardId) =>
    set((state) => ({
      [`${target}Board`]: state[`${target}Board`].filter((id) => id !== cardId),
    })),

  clearBoard: () =>
    set({
      playerBoard: [],
      enemyBoard: [],
    }),

  incrementRound: () =>
    set((state) => ({ roundNumber: state.roundNumber + 1 })),

  resetMatch: () =>
    set({
      player: { health: 30, mana: 0 },
      enemy: { health: 30, mana: 0 },
      turn: "player",
      playerBoard: [],
      enemyBoard: [],
      roundNumber: 1,
    }),
}));
