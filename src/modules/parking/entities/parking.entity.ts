import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Parking {
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
    eager: false, // No cargar automáticamente la información del usuario
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
