import { Game } from 'src/games/game.entity';

export const mockGames: Game[] = [
  {
    id: 1,
    name: 'Chess',
    played_at: new Date('2015-01-01T01:00:00.000Z'),
    member: {
      id: 1,
      name: 'steve',
      gamesPlayed: [],
    },
  },
  {
    id: 2,
    name: 'Tennis',
    played_at: new Date('2015-01-02T02:00:00.000Z'),
    member: {
      id: 1,
      name: 'steve',
      gamesPlayed: [],
    },
  },
];
