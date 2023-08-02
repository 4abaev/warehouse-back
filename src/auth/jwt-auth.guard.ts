import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const cookiesString = req.headers.cookie;
      const tokenStartIndex = cookiesString.indexOf('token=');
      const authHeader = cookiesString
        .substring(tokenStartIndex + 6)
        .split(';')[0];
      // const authHeader = req.headers.authorization;
      // const bearer = authHeader.split(' ')[0];
      // const token = authHeader.split(' ')[1];
      const bearer = authHeader.split('_')[0];
      const token = authHeader.split('_')[1];
      console.log(bearer, token);
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
