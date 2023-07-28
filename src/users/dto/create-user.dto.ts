import { IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsString()
  @Length(4, 50, {
    message: 'Имя пользователя должно содержать от 4 до 50 символов',
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
