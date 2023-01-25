import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/members/member.entity';
import { MembersService } from 'src/members/members.service';
import { Game } from './game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Member])],
  controllers: [GamesController],
  providers: [GamesService, MembersService],
  exports: [GamesService],
})
export class GamesModule {}
