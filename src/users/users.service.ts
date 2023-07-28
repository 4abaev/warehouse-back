import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hasAnyUser = await this.prisma.user.findMany();
    if (hasAnyUser.length) {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } else {
      return await this.prisma.user.create({
        data: { ...createUserDto, role: 'ADMIN' },
      });
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findByLogin(login: string) {
    const user = await this.prisma.user.findFirst({
      where: { login },
    });
    return user;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({ where: { id } });
    return user.id;
  }
}
