import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Parking } from '../../parking/entities/parking.entity';

@Entity()
export class ParkingSpot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleDetails: string;

  @Column({ type: 'timestamp' })
  reservationDate: Date;

  @Column({ type: 'int' })
  reservationTime: number;

  @Column({ type: 'timestamp' })
  reservationFinish: Date;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  user: User;

  @ManyToOne(() => Parking, (parking) => parking.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  parking: Parking;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
