import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, TokenResponseDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post('/signUp')
  create(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Авторизация' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post('/signIn')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
