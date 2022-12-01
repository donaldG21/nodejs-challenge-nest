import { Member } from 'src/members/member.entity';

export const mockMembers: Member[] = [
  {
    id: 1,
    name: 'steve',
    gamesPlayed: [
      {
        id: 1,
        name: 'Chess',
        played_at: new Date('2015-01-01T01:00:00.000Z'),
      },
      {
        id: 2,
        name: 'Tennis',
        played_at: new Date('2015-01-02T02:00:00.000Z'),
      },
      {
        id: 3,
        name: 'Soccer',
        played_at: new Date('2015-01-03T03:00:00.000Z'),
      },
      {
        id: 4,
        name: 'Chess',
        played_at: new Date('2015-01-06T04:00:00.000Z'),
      },
      {
        id: 5,
        name: 'Chess',
        played_at: new Date('2015-01-06T05:00:00.000Z'),
      },
      {
        id: 6,
        name: 'Tennis',
        played_at: new Date('2015-01-07T06:00:00.000Z'),
      },
      {
        id: 7,
        name: 'Tennis',
        played_at: new Date('2015-01-07T07:00:00.000Z'),
      },
      {
        id: 8,
        name: 'Soccer',
        played_at: new Date('2015-01-07T08:00:00.000Z'),
      },
      {
        id: 9,
        name: 'Soccer',
        played_at: new Date('2015-01-08T09:00:00.000Z'),
      },
      {
        id: 10,
        name: 'Chess',
        played_at: new Date('2015-01-09T01:00:00.000Z'),
      },
      {
        id: 11,
        name: 'Tennis',
        played_at: new Date('2015-01-10T02:00:00.000Z'),
      },
      {
        id: 12,
        name: 'Soccer',
        played_at: new Date('2015-01-11T03:00:00.000Z'),
      },
      {
        id: 13,
        name: 'Soccer',
        played_at: new Date('2015-01-12T04:00:00.000Z'),
      },
      {
        id: 14,
        name: 'Tennis',
        played_at: new Date('2015-01-13T05:00:00.000Z'),
      },
      {
        id: 15,
        name: 'Chess',
        played_at: new Date('2015-01-15T06:00:00.000Z'),
      },
      {
        id: 16,
        name: 'Soccer',
        played_at: new Date('2015-01-17T07:00:00.000Z'),
      },
    ],
  },
  {
    id: 2,
    name: 'john',
    gamesPlayed: [],
  },
  {
    id: 3,
    name: 'jackie',
    gamesPlayed: [],
  },
];
