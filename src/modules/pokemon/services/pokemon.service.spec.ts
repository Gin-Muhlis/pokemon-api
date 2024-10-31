import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { getModelToken } from '@nestjs/mongoose';
import { Pokemon } from '../../../database/schemas/pokemon.schema';
import { Model } from 'mongoose';
import {
  valueMockListPokemon,
  valueMockPokemonData,
  valueMockPokemonService,
  valueMockResponseDetailPokemon,
  valueMockResponseListPokemon,
} from './pokemon.setup';
import { BadRequestException } from '@nestjs/common';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let model: Model<Pokemon>;

  const mockPokemonService = valueMockPokemonService;
  const mockPokemonData = valueMockPokemonData;
  const mockListPokemon = valueMockListPokemon;

  const mockResponseListPokemon = valueMockResponseListPokemon;
  const mockResponseDetailPokemon = valueMockResponseDetailPokemon;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getModelToken(Pokemon.name),
          useValue: mockPokemonService,
        },
      ],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);

    model = module.get<Model<Pokemon>>(getModelToken(Pokemon.name));

    jest.restoreAllMocks();
  });

  describe('find', () => {
    it('should find and return list pokemon data', async () => {
      const query = { page: '1' };

      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            select: () => ({
              limit: () => ({
                skip: jest.fn().mockResolvedValueOnce([mockListPokemon]),
              }),
            }),
          }) as any,
      );

      const result = await pokemonService.find(query);

      expectResultListPokemon(result);
    });
  });

  describe('detail', () => {
    it('should find and return pokemon data', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockPokemonData);

      const namePokemon = 'bulbasaur';
      const result = await pokemonService.detail(namePokemon);

      expectFindDetailPokemon(result, namePokemon);
    });

    it('should throw a BadRequestException when pokemon not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);

      const namePokemon = 'bulbasaur';

      expectThrowBadRequestException(namePokemon);
    });
  });

  function expectResultListPokemon(result) {
    expect(result).toEqual(mockResponseListPokemon);
  }

  function expectFindDetailPokemon(result, namePokemon) {
    expect(model.findOne).toHaveBeenCalledWith({ name: namePokemon });
    expect(result).toEqual(mockResponseDetailPokemon);
  }

  async function expectThrowBadRequestException(namePokemon) {
    await expect(pokemonService.detail(namePokemon)).rejects.toThrow(
      BadRequestException,
    );
  }
});
