import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Group } from '../enums/group';
import { Ticket } from './ticket';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('int')
  group: Group;

  @OneToMany(type => Ticket, ticket => ticket.user)
  tickets: Ticket[];
}
