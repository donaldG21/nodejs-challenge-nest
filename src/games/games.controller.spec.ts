import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { Member } from 'src/members/member.entity';
import { MembersService } from 'src/members/members.service';
import { entityManagerMockFactory } from 'src/utils/testing-utils/mock-factory';
import { Game } from './game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

describe('GamesController', () => {
  let controller: GamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        GamesService,
        MembersService,
        {
          provide: getRepositoryToken(Game),
          useValue: jest.fn(),
        },
        {
          provide: getRepositoryToken(Member),
          useValue: jest.fn(),
        },
        {
          provide: getEntityManagerToken(),
          useFactory: entityManagerMockFactory,
        },
      ],
    }).compile();

    controller = module.get<GamesController>(GamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
