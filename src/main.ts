import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app
    .listen(3000)
    .then(() => {
      console.log('your app is running on port 30000');
    })
    .catch((e) => {
      console.log(' there  is error :' + e);
    });
}
bootstrap();
