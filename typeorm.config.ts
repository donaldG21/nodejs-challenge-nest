import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Member } from './src/members/member.entity';
import { Game } from './src/games/game.entity';
import { CreateTables1666073431541 } from './migrations/1666073431541-CreateTables';
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
  migrations: [CreateTables1666073431541],
});
