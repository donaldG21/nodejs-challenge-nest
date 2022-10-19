import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Member } from './src/members/member.entity';
import { Game } from './src/games/game.entity';
import { CreateSchema1666140621741 } from './migrations/1666140621741-CreateSchema';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST') || 'localhost',
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USERNAME'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  logging: true,
  entities: [Member, Game],
  migrations: [CreateSchema1666140621741],
});
