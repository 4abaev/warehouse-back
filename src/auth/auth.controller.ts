import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  create(@Body() dto: CreateUserDto) {
    return this.authService.regist(dto);
  }

  @Post('/login')
  findAll(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
