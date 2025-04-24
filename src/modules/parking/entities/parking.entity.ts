import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Parking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleDetails: string;

  @Column()
  reservationDate: number;

  @Column()
  reservationTime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
