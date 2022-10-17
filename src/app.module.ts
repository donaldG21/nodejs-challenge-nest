import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [MembersModule, GamesModule],
})
export class AppModule {}
