import { EntityManager } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private dataSource: EntityManager) {}

  async createUser(usuario: CreateUserDto): Promise<User> {
    const userRepository = this.dataSource.getRepository(User);

    const usuarioNew = userRepository.create({
      ...usuario,
      password: await bcrypt.hash(usuario.password, 10),
    });

    return userRepository.save(usuarioNew);
  }

  async getUsers(): Promise<User[]> {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
  }
}
