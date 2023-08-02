import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  id: string;

  @ApiProperty({
    default: 'vlad123',
  })
  @IsString()
  @Length(4, 50, {
    message: 'Логин пользователя должен содержать от 4 до 50 символов',
  })
  login: string;

  @ApiProperty({
    default: 'Иванов Иван Иванович',
  })
  @IsString()
  @Length(4, 100, {
    message: 'ФИО пользователя должны содержать от 4 до 100 символов',
  })
  username: string;

  @ApiProperty({
    default: '12345qwerty',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({
    default: 'Менеджер',
  })
  @IsOptional()
  role: string;

  @ApiProperty({
    default: 'Администратор',
  })
  @IsString()
  post: string;
}
