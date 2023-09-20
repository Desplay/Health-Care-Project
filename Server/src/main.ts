import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const post = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(post);
}
bootstrap();
