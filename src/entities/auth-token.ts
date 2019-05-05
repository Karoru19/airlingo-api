import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index
} from 'typeorm';
import { User } from './user';

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @Column()
  @Index({ unique: true })
  key: string;
}
