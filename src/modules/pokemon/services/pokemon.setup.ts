export const valueMockPokemonService = {
  findOne: jest.fn(),
  find: jest.fn(),
};

export const valueMockPokemonData = {
  _id: '6721a8d65bc8c48a71ac6a29',
  name: 'bulbasaur',
  number: 1,
  types: ['grass', 'poison'],
  height: 7,
  weight: 69,
  abilities: ['overgrow', 'chlorophyll'],
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  experience: 64,
  stats: {
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
    _id: '6721a8d65bc8c48a71ac6a2a',
  },
  moves: ['razor-wind', 'swords-dance', 'cut'],
};

export const valueMockListPokemon = {
  _id: valueMockPokemonData._id,
  name: valueMockPokemonData.name,
  number: valueMockPokemonData.number,
  image: valueMockPokemonData.image,
};

export const valueMockResponseListPokemon = {
  statusCode: 200,
  nextPage: 2,
  results: [valueMockListPokemon],
};

export const valueMockResponseDetailPokemon = {
  statusCode: 200,
  pokemon: valueMockPokemonData,
};
