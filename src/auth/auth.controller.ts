import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, TokenResponseDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Регистрация' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post('/signUp')
  create(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(dto, res);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Авторизация' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post('/signIn')
  login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }
}
