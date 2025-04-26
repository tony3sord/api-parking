import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../user/repository/user.repository';
import { CreateAuthDto } from '../dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(createAuthDto: CreateAuthDto): Promise<{ token: string }> {
    const { identifier, password } = createAuthDto;

    let user: User | undefined;
    if (this.isEmail(identifier)) {
      user = await this.userRepository.getUserByEmail(identifier);
    } else if (this.isPhoneNumber(identifier)) {
      user = await this.userRepository.getUserByPhone(identifier);
    } else {
      user = await this.userRepository.getUserByUserName(identifier);
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.login(user);
  }

  private login(user: User): { token: string } {
    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
      idUser: user.id,
    };
    const token: { token: string } = {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
    return token;
  }

  private isEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
  }

  private isPhoneNumber(identifier: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(identifier);
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
