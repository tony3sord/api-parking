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

  async getForId(id: string) {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where({ id: id })
      .getOne();
    if (!user) throw new NotFoundException();
    return user;
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    const userRepository = this.dataSource.getRepository(User);
    const userToUpdate = await userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!userToUpdate) {
      throw new Error('User not found');
    }

    if (user.name !== undefined) {
      userToUpdate.name = user.name;
    }

    if (user.lastname !== undefined) {
      userToUpdate.lastname = user.lastname;
    }

    if (user.email !== undefined) {
      userToUpdate.email = user.email;
    }

    if (user.username !== undefined) {
      userToUpdate.username = user.username;
    }
    if (user.role !== undefined) {
      userToUpdate.role = user.role;
    }

    return await userRepository.save(userToUpdate);
  }

  async getUserByEmail(email: string) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where({ email: email })
      .getOne();
  }

  async getAdmin() {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where({ role: 'Admin' })
      .getOne();
  }

  async getUserByUserName(username: string) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where({ username: username })
      .getOne();
  }

  async deleteUser(id: string) {
    console.log(id);

    await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .delete()
      .where('id = :id', { id })
      .execute();
    return 'User deleted successfully';
  }
}
