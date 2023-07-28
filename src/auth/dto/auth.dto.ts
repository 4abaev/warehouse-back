import { IsOptional, IsString, isString } from 'class-validator';

export class AuthDto {
  @IsString()
  login: string;

  @IsOptional()
  @IsString()
  password: string;
}
