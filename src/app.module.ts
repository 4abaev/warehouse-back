import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, OrdersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
