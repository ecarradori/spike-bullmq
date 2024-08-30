import { NestFactory } from '@nestjs/core';
import { MicroserviceAModule } from './microservice-a.module';

async function bootstrap() {
  const app = await NestFactory.create(MicroserviceAModule);
  await app.listen(3000);
  console.log('Microservice A is running on port 3000');
}
bootstrap();
