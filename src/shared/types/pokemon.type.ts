export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonMove = {
  move: {
    name: string;
    url: string;
  };
};

export type PokemonList = {
  name: string;
  url: string;
};

export type Stats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export type PokemonDetail = {
  name: string;
  id: number;
  types: string[];
  number: number;
  height: number;
  weight: number;
  abilities: string[];
  image: string;
  base_experience: number;
  stats: Stats;
  moves: string[];
};
