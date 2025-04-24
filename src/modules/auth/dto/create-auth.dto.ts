import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  identifier: string;

  @IsString()
  password: string;
}
