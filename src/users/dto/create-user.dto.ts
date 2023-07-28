import { IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsString()
  @Length(4, 16, {
    message: 'Логин пользователя должен содержать от 4 до 16 символов',
  })
  login: string;

  @IsString()
  @Length(4, 50, {
    message: 'ФИО пользователя должны содержать от 4 до 50 символов',
  })
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsString()
  post: string;
}
