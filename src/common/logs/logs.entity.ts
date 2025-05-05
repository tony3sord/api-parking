import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';

@Entity()
export class Log {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column()
  statusCode: number;

  @Column({ nullable: true })
  userId: string | null;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Date;
}
