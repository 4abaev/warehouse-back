import { user } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class RenderUser {
  @Exclude()
  password: string;

  constructor(partial: Partial<user>) {
    Object.assign(this, partial);
  }
}
