import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './root/app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Callback, Context, Handler } from "aws-lambda";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestoLogger } from "nestolog";

let server: Handler;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(NestoLogger));
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('aws lambda http')
    .setDescription('lambda de ejemplo de aws con nest ')
    .setVersion('1.0')
    .addTag('lambda')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress ({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? await bootstrap();
  return server(event, context, callback);
};
