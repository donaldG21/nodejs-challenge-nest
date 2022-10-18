import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from '../members/member.entity';

/**
 * Entity Schema for Games.
 *
 * @class
 */
@Entity()
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
