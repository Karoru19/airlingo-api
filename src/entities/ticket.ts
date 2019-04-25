import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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
  user: User;

  @ManyToOne(type => Flight, flight => flight.tickets)
  flight: Flight;

  @Column()
  price: number;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  pdf: string;

  @Column()
  token: string;
}
