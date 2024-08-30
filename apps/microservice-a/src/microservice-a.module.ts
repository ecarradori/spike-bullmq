import { Module } from '@nestjs/common';
import { MicroserviceAProducer } from './microservice-a.producer';
import { BullModule } from '@nestjs/bullmq';
import { MicroserviceAController } from './microservice-a.controller';
import { MicroserviceAListener } from './microservice-a.listener';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'microservice-a',
      defaultJobOptions: {
        attempts: 7,
        backoff: {
          //? Here we can a custom backoff strategy to retry failing jobs
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
  ],
  providers: [MicroserviceAProducer, MicroserviceAListener],
  controllers: [MicroserviceAController],
})
export class MicroserviceAModule {}
