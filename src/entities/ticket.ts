import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index
} from 'typeorm';
import { Flight } from './flight';
import { User } from './user';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @ManyToOne(type => User, user => user.tickets, { nullable: true })
  user: User | number;

  @ManyToOne(type => Flight, flight => flight.tickets)
  flight: Flight | number;

  @Column()
  price: number;

  @Column({ nullable: true })
  discount: number;

  @Column({ default: false })
  window: boolean;

  @Column({ default: false })
  business: boolean;

  @Column({ nullable: true })
  pdf: string;

  @Column()
  @Index({ unique: true })
  token: string;
}
