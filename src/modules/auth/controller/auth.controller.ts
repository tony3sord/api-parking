import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.validateUser(createAuthDto);
  }

  @Get()
  async getMe(@Headers('Authorization') token: string) {
    return await this.authService.verifyToken(token.split(' ')[1]);
  }
}
