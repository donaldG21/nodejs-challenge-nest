import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getStreaksFromArray } from 'src/utils/date-utils';
import { Repository } from 'typeorm';
import { MemberDto } from './dto/member.dto';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  create({ name }: MemberDto): Promise<Member> {
    const member = new Member();
    member.name = name;

    return this.memberRepository.save(member);
  }

  /**
   * Fetch all members from db
   * @returns {Member[]}
   */
  async findAll(): Promise<Member[]> {
    return this.memberRepository.find({
      relations: {
        gamesPlayed: true,
      },
    });
  }

  async findOrCreate(memberDto: MemberDto): Promise<Member> {
    const member = await this.memberRepository.findOneBy({
      name: memberDto.name,
    });

    if (member) return member;

    return this.create(memberDto);
  }

  /**
   * Get streaks of days games played for member.
   * @param {string} id
   * @returns {string[][]}
   */
  async getStreaks(id: number): Promise<string[][] | []> {
    const member = await this.memberRepository.findOne({
      where: { id },
      relations: { gamesPlayed: true },
    });
    return getStreaksFromArray(member.gamesPlayed.map((g) => g.played_at));
  }
}
