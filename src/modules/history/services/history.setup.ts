export const valueMockHistoryService = {
  find: jest.fn(),
};

export const valueMockHistory = {
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
};

export const valueMockResponseListHistory = {
  statusCode: 200,
  results: [valueMockHistory],
}