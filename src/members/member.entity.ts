import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../games/game.entity';

/**
 * Entity Schema for Members.
 *
 * @class
 */
@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'John', description: "Member's first name" })
  name: string;

  @OneToMany(() => Game, (game) => game.member)
  gamesPlayed: Game[];
}
