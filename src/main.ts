import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const PORT = process.env.APP_PORT || 4000;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Документация для веб-приложения Склад')
    .setVersion('1.0.0')
    .addTag('Developer telegram - @Ch000001')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: [
      configService.get('FRONTEND_URL_HTTP'),
      configService.get('FRONTEND_URL_HTTPS'),
    ],
    credentials: true,
  });

  await app.listen(PORT, () => {
    console.log(`App started at ${PORT}`);
  });
}
bootstrap();
