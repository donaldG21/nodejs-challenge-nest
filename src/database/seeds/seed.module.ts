import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from 'src/games/games.module';
import { GamesSeedService } from './games-seed.service';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    }),
    GamesModule,
  ],
  providers: [GamesSeedService],
})
export class SeederModule {}
