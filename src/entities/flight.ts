import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Plane } from './plane';
import { Ticket } from './ticket';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ default: '16:00' })
  departureTime: string;

  @Column()
  duration: number;

  @Column()
  distance: number;

  @ManyToOne(type => Plane, plane => plane.flights)
  plane: Plane | number;

  @OneToMany(type => Ticket, ticket => ticket.flight)
  tickets: Ticket[];
}
