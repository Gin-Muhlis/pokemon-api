import { valueMockPokemonData } from '../../pokemon/services/pokemon.setup';

export const valueMockCatchedService = {
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndDelete: jest.fn(),
  countDocuments: jest.fn(),
  exists: jest.fn(),
};

export const valueMockPokemonService = {
  findById: jest.fn(),
};
export const valueMockHistoryService = {
  create: jest.fn(),
};

export const valueMockCatched = {
  _id: '6721df297e26c559f9654914',
  nickname: 'Pokekepo',
  pokemon: {
    _id: '6721a8d65bc8c48a71ac6a31',
    name: 'charmeleon',
    number: 5,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
  },
  createdAt: '2024-10-30T07:24:25.700Z',
  updatedAt: '2024-10-30T07:24:25.700Z',
  __v: 0,
} as any;

export const valueMockCreatedCatched = {
  _id: '6721df297e26c559f9654914',
  nickname: 'Pokekepo',
  pokemon: '6721a8d65bc8c48a71ac6a31',
} as any;

export const valueMockResponseListCatched = {
  statusCode: 200,
  results: [valueMockCatched],
};

export const valueMockPokemon = valueMockPokemonData;

export const valueMockResponseCreatedCatched = {
  statusCode: 201,
  message: 'Pokemon bulbasaur successfully catched',
};

export const valueMockResponseDeleteCatched = {
  statusCode: 200,
  message: 'Pokemon successfully deleted',
};

export const valueMockResponseCountCatched = {
  statusCode: 200,
  count: 2,
};

export const valueMockResponseIsCatched = {
  statusCode: 200,
  isCatched: true,
};
