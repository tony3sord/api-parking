import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userName = await this.userRepository.getUserByUserName(
      createUserDto.username,
    );
    const userEmail = await this.userRepository.getUserByEmail(
      createUserDto.email,
    );
    if (userEmail || userName) {
      throw new ConflictException('Email or Username already exists');
    }
    return await this.userRepository.createUser(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.getForId(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userName = await this.userRepository.getUserByUserName(
      updateUserDto.username,
    );
    const userEmail = await this.userRepository.getUserByEmail(
      updateUserDto.email,
    );
    if (
      (userEmail && userEmail.id !== id) ||
      (userName && userName.id !== id)
    ) {
      throw new ConflictException('Email or Username already exists');
    }
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
