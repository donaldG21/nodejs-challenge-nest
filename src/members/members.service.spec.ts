import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockMembers } from 'src/utils/mocks/mock-members';
import {
  MockType,
  repositoryMockFactory,
} from 'src/utils/testing-utils/mock-factory';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { MembersService } from './members.service';

describe('MembersService', () => {
  let service: MembersService;
  let repositoryMock: MockType<Repository<Member>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getRepositoryToken(Member),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
    repositoryMock = module.get(getRepositoryToken(Member));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all members', async () => {
    repositoryMock.find.mockReturnValue(mockMembers);
    const users: Member[] = await service.findAll();
    expect(users).toHaveLength(3);
  });

  it('should save a member', async () => {
    const member = { name: 'alvin' };
    repositoryMock.save.mockReturnValue({ id: 4, ...member });

    const createdMember: Member = await service.create(member);

    expect(createdMember.id).toEqual(expect.any(Number));
    expect(createdMember.name).toEqual(member.name);
  });

  it('should get streaks of days games played', async () => {
    const id = 1;
    const expectedStreaks = [
      '2015-02-28 00:00:00.000 -0500',
      '2015-03-01 00:00:00.000 -0500',
      '2015-04-01 00:00:00.000 -0400',
    ].map((d) => new Date(d));

    const streaks: Date[][] = await service.getStreaks(id);
    expect(expectedStreaks).toEqual(streaks);
  });
});
