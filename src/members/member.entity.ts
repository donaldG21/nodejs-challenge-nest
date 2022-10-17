import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../games/game.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ example: 'John', description: "Member's first name" })
  first_name: string;

  @OneToMany(() => Game, (game) => game.player, { eager: true })
  gamesPlayed: Game[];
}
