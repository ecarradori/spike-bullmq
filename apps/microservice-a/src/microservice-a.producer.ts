import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class MicroserviceAProducer {
  constructor(
    @InjectQueue('microservice-a') private readonly microserviceAQueue: Queue,
  ) {}

  async addDefaultJob() {
    console.log('Adding default job...');
    await this.microserviceAQueue.add('microservice-a-default-job', {
      data: 'Microservice A defaultJob',
    });
    console.log('Default job added');
  }

  async addNotHandledJob() {
    console.log('Adding not handled job...');
    await this.microserviceAQueue.add(
      'microservice-a-not-handled-job',
      {
        data: 'Microservice A notHandledJob',
      },
      {
        // attempts: 7,
        // backoff: {
        //   type: 'exponential',
        //   delay: 1000,
        // },
      },
    );
    console.log('Not handled job added');
  }

  async addDelayedJob() {
    console.log('Adding delayed job...');
    await this.microserviceAQueue.add(
      'microservice-a-delayed-job',
      {
        data: 'Microservice A delayedJob',
      },
      {
        delay: 3000,
      },
    );
    console.log('Delayed job added');
  }

  async addRepeatableJob() {
    console.log('Adding repeatable job...');
    await this.microserviceAQueue.add(
      'microservice-a-repeatable-job',
      {
        data: 'Microservice A repeatableJob',
      },
      {
        repeat: {
          every: 10000,
          limit: 3,
          // pattern: '*/10 * * * * *',
        },
      },
    );
    console.log('Repeatable job added');
  }
}
