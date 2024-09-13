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
        removeOnComplete: {
          age: 60 * 60 * 24 * 30, // 1 month in seconds
        },
        removeOnFail: {
          age: 60 * 60 * 24 * 90, // 3 months in seconds
        },
      },
    }),
  ],
  providers: [MicroserviceAProducer, MicroserviceAListener],
  controllers: [MicroserviceAController],
})
export class MicroserviceAModule {}
