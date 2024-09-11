/* eslint-disable @typescript-eslint/no-unused-vars */
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('microservice-a')
export class MicroserviceBConsumer extends WorkerHost {
  @OnWorkerEvent('active')
  onActive(job: Job<any, any, string>) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
        null,
        2,
      )} ...`,
    );
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<any, any, string>) {
    console.log(
      `Job ${job.id} of type ${job.name} failed with error ${job.failedReason}`,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<any, any, string>) {
    console.log(
      `Job ${job.id} of type ${job.name} completed with result ${JSON.stringify(
        job.returnvalue,
        null,
        2,
      )}`,
    );
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'microservice-a-default-job':
        return await this.processDefaultJob(job);
      case 'microservice-a-delayed-job':
        return await this.processDelayedJob(job);
      case 'microservice-a-repeatable-job':
        return await this.processRepeatableJob(job);
      default:
        throw new Error(`Cannot handle job ${job.name}`);
    }
  }

  async processDefaultJob(job: Job<any, any, string>) {
    //? https://docs.bullmq.io/guide/returning-job-data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 'completed' });
      }, 3000);
    });
    // return { status: 'completed' };
  }

  async processDelayedJob(job: Job<any, any, string>) {
    return { status: 'completed' };
  }

  async processRepeatableJob(job: Job<any, any, string>) {
    return { status: 'completed' };
  }
}
