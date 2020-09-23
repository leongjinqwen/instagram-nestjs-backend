import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors() // Enabling CORS
  await app.listen(5000); // default run port 3000

}
bootstrap();
