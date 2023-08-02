import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    default: 'vlad123',
  })
  @IsString()
  login: string;

  @ApiProperty({
    example: '123qwerty',
    required: false,
  })
  @IsOptional()
  @IsString()
  password: string;
}

export class TokenResponseDto {
  @ApiProperty({ type: String })
  token: string;
}
