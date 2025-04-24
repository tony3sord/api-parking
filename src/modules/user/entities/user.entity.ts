import { Parking } from 'src/modules/parking/entities/parking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Index()
  @Column()
  username: string;

  @Index()
  @Column()
  email: string;

  @Index()
  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Parking, (parking) => parking.user)
  parking: Parking;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
