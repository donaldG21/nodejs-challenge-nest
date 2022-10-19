import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Member } from '../members/member.entity';

/**
 * Entity Schema for Games.
 *
 * @class
 */
@Entity()
@Unique(['name', 'played_at', 'member'])
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamptz' })
  played_at: Date;

  @ManyToOne(() => Member, (member) => member.gamesPlayed)
  member: Member;
}
