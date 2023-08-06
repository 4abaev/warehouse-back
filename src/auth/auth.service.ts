import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(dto: CreateUserDto, res: Response) {
    const candidate = await this.usersService.findByLogin(dto.login);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.create(dto);
    const { token } = await this.generateToken(user);
    res.cookie('token', `Bearer_${token}`, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: 'localhost',
    });
    return token;
  }

  async login(dto: AuthDto, res: Response) {
    const user = await this.validateUser(dto);
    const { token } = await this.generateToken(user);
    res.cookie('token', `Bearer_${token}`, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: 'localhost',
    });
    return token;
  }

  async validateUser(dto: AuthDto) {
    const user = await this.usersService.findByLogin(dto.login);

    if (!user) {
      throw new UnauthorizedException('Пользователь с таким логином не найден');
    }

    if (user.password && user.role === 'ADMIN') {
      if (user.password === dto.password) {
        return user;
      } else {
        throw new UnauthorizedException('Пароль не верный');
      }
    } else {
      return user;
    }
  }

  private async generateToken(user: CreateUserDto) {
    const payload = {
      id: user.id,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
