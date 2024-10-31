import mongoose, { Model } from 'mongoose';
import { CatchedService } from './catched.service';
import { Catched } from '../../../database/schemas/catched.schema';
import {
  valueMockCatched,
  valueMockCatchedService,
  valueMockCreatedCatched,
  valueMockHistoryService,
  valueMockPokemon,
  valueMockPokemonService,
  valueMockResponseCountCatched,
  valueMockResponseCreatedCatched,
  valueMockResponseDeleteCatched,
  valueMockResponseIsCatched,
  valueMockResponseListCatched,
} from './catched.setup';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Pokemon } from '../../../database/schemas/pokemon.schema';
import { History } from '../../../database/schemas/history.schema';
import { BadRequestException } from '@nestjs/common';

describe('CatchedService', () => {
  let catchedService: CatchedService;
  let modelCatched: Model<Catched>;
  let modelHistory: Model<History>;
  let modelPokemon: Model<Pokemon>;

  const mockCatchedService = valueMockCatchedService;
  const mockPokemonService = valueMockPokemonService;
  const mockHistoryService = valueMockHistoryService;

  const mockCached = valueMockCatched;
  const mockPokemon = valueMockPokemon;
  const mockCreatedCatched = valueMockCreatedCatched;

  const mockResponseListCatched = valueMockResponseListCatched;
  const mockResponseCreateCatched = valueMockResponseCreatedCatched;
  const mockResponseDeleteCatched = valueMockResponseDeleteCatched;
  const mockResponseCountCatched = valueMockResponseCountCatched;
  const mockResponseIsCatched = valueMockResponseIsCatched;

  const dataDto = {
    nickname: 'poke poke',
  };
  let idPokemon = '6721a8d65bc8c48a71ac6a29';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatchedService,
        {
          provide: getModelToken(Catched.name),
          useValue: mockCatchedService,
        },
        {
          provide: getModelToken(Pokemon.name),
          useValue: mockPokemonService,
        },
        {
          provide: getModelToken(History.name),
          useValue: mockHistoryService,
        },
      ],
    }).compile();

    catchedService = module.get<CatchedService>(CatchedService);
    modelCatched = module.get<Model<Catched>>(getModelToken(Catched.name));
    modelHistory = module.get<Model<History>>(getModelToken(History.name));
    modelPokemon = module.get<Model<Pokemon>>(getModelToken(Pokemon.name));

    jest.resetAllMocks();
  });

  describe('findCatched', () => {
    it('should find and return list catched pokemon', async () => {
      jest.spyOn(modelCatched, 'find').mockImplementation(
        () =>
          ({
            sort: () => ({
              populate: jest.fn().mockResolvedValueOnce([mockCached]),
            }),
          }) as any,
      );

      const result = await catchedService.findCatched();

      expectToEqualValue(result, mockResponseListCatched);
    });
  });

  describe('createCatched', () => {
    it('should create catched pokemon history', async () => {
      jest.spyOn(modelPokemon, 'findById').mockResolvedValueOnce(mockPokemon);

      jest
        .spyOn(modelCatched, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockCreatedCatched));

      jest
        .spyOn(modelHistory, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockCreatedCatched));

      const result = await catchedService.createCatched(idPokemon, dataDto);

      expectToEqualValue(result, mockResponseCreateCatched);
    });

    it('should throw a BadRequestException when pokemon not found', async () => {
      const mockIsValidObjectId = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValueOnce(false);

      idPokemon = 'invalid-id';

      expectBadRequestException(
        catchedService.createCatched(idPokemon, dataDto),
      );

      mockIsValidObjectId.mockRestore();
    });
  });

  describe('deleteCatched', () => {
    it('should delete catched pokemon', async () => {
      jest
        .spyOn(modelCatched, 'findByIdAndDelete')
        .mockResolvedValueOnce(mockCached);

      idPokemon = '6721df297e26c559f9654914';
      const result = await catchedService.deleteCatched(idPokemon);

      expectToEqualValue(result, mockResponseDeleteCatched);
    });

    it('should throw a BadRequestException when pokemon not found', async () => {
      const mockIsValidObjectId = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValueOnce(false);

      idPokemon = 'invalid-id';

      expectBadRequestException(catchedService.deleteCatched(idPokemon));

      mockIsValidObjectId.mockRestore();
    });
  });

  describe('getCountCathed', () => {
    it('should return count of catched pokemon', async () => {
      jest.spyOn(modelCatched, 'countDocuments').mockResolvedValueOnce(2);

      const result = await catchedService.getCountCatched();

      expectToEqualValue(result, mockResponseCountCatched);
    });
  });

  describe('getIsCatched', () => {
    it('should return a pokemon is catched', async () => {
      jest.spyOn(modelCatched, 'exists').mockResolvedValueOnce(mockCached);

      idPokemon = '6721df297e26c559f9654914';

      const result = await catchedService.getIsCatched(idPokemon);

      expectToEqualValue(result, mockResponseIsCatched);
    });

    it('should return a pokemon is not catched', async () => {
      jest.spyOn(modelCatched, 'exists').mockResolvedValueOnce(null);

      idPokemon = '6721df297e26c559f9654914';

      const result = await catchedService.getIsCatched(idPokemon);

      mockResponseIsCatched.isCatched = false;

      expectToEqualValue(result, mockResponseIsCatched);
    });

    it('should throw a BadRequestException when pokemon not found', async () => {
      const mockIsValidObjectId = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValueOnce(false);

      idPokemon = 'invalid-id';

      expectBadRequestException(catchedService.getIsCatched(idPokemon));

      mockIsValidObjectId.mockRestore();
    });
  });

  function expectToEqualValue(result, value) {
    expect(result).toEqual(value);
  }

  async function expectBadRequestException(result) {
    await expect(result).rejects.toThrow(BadRequestException);
  }
});
