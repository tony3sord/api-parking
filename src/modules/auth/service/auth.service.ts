import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUser(createAuthDto: CreateAuthDto): Promise<any> {
    const { identifier, password } = createAuthDto;

    let user;
    if (this.isEmail(identifier)) {
      user = await this.userRepository.getUserByEmail(identifier);
    } else if (this.isPhoneNumber(identifier)) {
      user = await this.userRepository.getUserByPhone(identifier);
    } else {
      user = await this.userRepository.getUserByUserName(identifier);
    }

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private isEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
  }

  private isPhoneNumber(identifier: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Formato E.164
    return phoneRegex.test(identifier);
  }
}
