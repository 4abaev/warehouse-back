import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    default: 'vlad123',
  })
  @IsString()
  login: string;

  @ApiProperty({
    default: '12345qwerty',
  })
  @IsOptional()
  @IsString()
  password: string;
}
