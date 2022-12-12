import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './root/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('aws lambda http')
    .setDescription('lambda de ejemplo de aws con nest ')
    .setVersion('1.0')
    .addTag('lambda')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3002);
}
bootstrap();
