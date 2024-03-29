import axios from 'axios';

const pokemonsEndpoint = (params: {offset: number; limit: number}) =>
  `https://pokeapi.co/api/v2/pokemon/?offset=${params.offset}&limit=${params.limit}`;

export const pokemonImgEndpoint = (pokemonId: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

const pokemonDetailEndpoint = (name: string) =>
  `https://pokeapi.co/api/v2/pokemon/${name}`;

const apiCall = async (endpoint: string) => {
  const option = {
    method: 'GET',
    url: endpoint,
  };
  try {
    const result = await axios.request(option);
    return result.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const fetchPokemons = (params: {offset: number; limit: number}) =>
  apiCall(pokemonsEndpoint(params));

export const fetchPokemonDetail = (name: string) => {
  apiCall(pokemonDetailEndpoint(name));
};
