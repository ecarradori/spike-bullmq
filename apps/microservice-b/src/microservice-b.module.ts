import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MicroserviceBConsumer } from './microservice-b.consumer';

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
    }),
    // BullModule.registerQueue({
    //   name: 'microservice-b',
    // }),
  ],
  providers: [MicroserviceBConsumer],
})
export class MicroserviceBModule {}
