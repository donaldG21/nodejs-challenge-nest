import { NestFactory } from '@nestjs/core';
import { GamesSeedService } from './database/seeds/games-seed.service';
import { SeederModule } from './database/seeds/seed.module';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then((appContext) => {
      const seeder = appContext.get(GamesSeedService);
      seeder
        .seedGames()
        .then(() => {
          console.debug('Seeding complete!');
        })
        .catch(() => {
          console.error('Seeding failed!');
        })
        .finally(async () => await appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
