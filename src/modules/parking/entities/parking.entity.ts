import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ParkingSpot } from 'src/modules/parkingSpot/entities/parkingSpot.entity';

@Entity()
export class Parking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ability: number;

  @OneToMany(() => ParkingSpot, (parkingSpot) => parkingSpot.parking, {})
  parkingSpot: ParkingSpot[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
