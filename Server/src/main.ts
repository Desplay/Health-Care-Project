import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || process.env.CUSTOMPORT || 3000;
  await app.listen(port);
  console.log(`localhost:${port}/graphql`);
}
bootstrap();
