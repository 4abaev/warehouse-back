import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }
  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
