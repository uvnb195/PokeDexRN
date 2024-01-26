export interface Pokemons {
  count: number;
  next: any;
  previous: any;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetail {
  stats: Stat[];
  types: PokemonType[];
}

interface PokemonType {
  name: string;
}

interface Stat {
  base_stat: number;
  stat: StatName;
}

type StatName =
  | {hp: 'Hp'}
  | {attack: 'Attack'}
  | {defense: 'Defense'}
  | {'special-attack': 'Special Attack'}
  | {'special-defense': 'Special Defense'}
  | {speed: 'Speec'};
