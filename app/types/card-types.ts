export type CardElement = "fire" | "water" | "earth" | "air" | "dark" | "light";

export type CardType = {
  id: string;
  name: string;
  image: string;
  attack: number;
  mana: number;
  description: string;
  element: CardElement;
  enemy?: boolean;
  hasAttacked?: boolean;
  defenseMode?: boolean;
};
