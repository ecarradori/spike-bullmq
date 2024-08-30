import { NestFactory } from '@nestjs/core';
import { MicroserviceBModule } from './microservice-b.module';

async function bootstrap() {
  const app = await NestFactory.create(MicroserviceBModule);
  await app.listen(3001);
  console.log('Microservice B is running on port 3001');
}
bootstrap();
