import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockMembers } from 'src/utils/mocks/mock-members';
import {
  MockType,
  repositoryMockFactory,
} from 'src/utils/testing-utils/mock-factory';
import { Repository } from 'typeorm';
import { MemberDto } from './dto/member.dto';
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

  it('should create a member', async () => {
    const memberDto: MemberDto = { name: 'alvin' };
    repositoryMock.save.mockReturnValue({ id: 4, ...memberDto });

    const createdMember: Member = await service.create(memberDto);

    expect(createdMember.id).toEqual(expect.any(Number));
    expect(createdMember.name).toEqual(memberDto.name);
  });

  it('should get streaks of days number of games incrementally played', async () => {
    const expectedStreaks: string[][] = [['1/3/2015', '1/6/2015', '1/7/2015']];
    const userId = 1;
    repositoryMock.findOne.mockReturnValue(mockMembers[0]);

    const streaks: string[][] = await service.getStreaks(userId);
    expect(expectedStreaks).toEqual(streaks);
  });
});
