type typeDescription = {
  weakness: string;
  strength: string;
};

export type TYPE = {
  [pokemonType: string]: typeDescription;
};

export const ELEMENTS_MAP: TYPE = {
  ["fire"]: { weakness: "water", strength: "grass" },
  ["water"]: { weakness: "electric", strength: "fire" },
  ["electric"]: { weakness: "ground", strength: "water" },
  ["grass"]: { weakness: "fire", strength: "ground" },
  ["ground"]: { weakness: "grass", strength: "electric" },
};
