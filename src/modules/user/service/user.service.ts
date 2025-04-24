import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.getForId(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: string): Promise<string> {
    const user = await this.userRepository.getForId(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.deleteUser(id);
  }
}
