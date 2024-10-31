import { Model } from 'mongoose';
import { HistoryService } from './history.service';
import { History } from '../../../database/schemas/history.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import {
  valueMockHistory,
  valueMockHistoryService,
  valueMockResponseListHistory,
} from './history.setup';

describe('HistoryService', () => {
  let historyService: HistoryService;
  let model: Model<History>;

  const mockHistoryService = valueMockHistoryService;
  const mockHistory = valueMockHistory;

  const mockResponseListHistory = valueMockResponseListHistory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: getModelToken(History.name),
          useValue: mockHistoryService,
        },
      ],
    }).compile();

    historyService = module.get<HistoryService>(HistoryService);
    model = module.get<Model<History>>(getModelToken(History.name));
  });

  describe('findHistory', () => {
    it('should find and return list history data', async () => {
      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            sort: () => ({
              populate: jest.fn().mockResolvedValueOnce([mockHistory]),
            }),
          }) as any,
      );

      const result = await historyService.findHistory();

      expectFindListHistory(result);
    });
  });

  function expectFindListHistory(result) {
    expect(result).toEqual(mockResponseListHistory);
  }
});
