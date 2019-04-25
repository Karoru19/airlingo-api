import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Flight } from './flight';

@Entity()
export class Plane {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pricePerKm: number; // In $

  @Column()
  seats: number;

  @Column()
  seatsInRow: number;

  @Column()
  seatsInBusinessClass: number;

  @Column()
  luggageLimit: number; // In Kg

  @Column()
  handLuggageLimit: number; // In Kg

  @OneToMany(type => Flight, flight => flight.plane)
  flights: Flight[];
}
