import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberDto } from './dto/member.dto';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  create(createMember: MemberDto): Promise<Member> {
    const member = new Member();
    member.name = createMember.name;

    return this.memberRepository.save(member);
  }

  async findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  async findOrCreate({ name }: MemberDto): Promise<Member> {
    const member = await this.memberRepository.findOneBy({ name: name });

    if (member) return member;

    const createdMember = new Member();
    createdMember.name = name;

    return this.memberRepository.save(member);
  }
}
