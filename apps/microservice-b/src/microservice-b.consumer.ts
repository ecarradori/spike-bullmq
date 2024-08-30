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
      `Job ${job.id} of type ${job.name} completed with result ${job.returnvalue}`,
    );
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'microservice-a-default-job':
        this.processDefaultJob(job);
        break;
      case 'microservice-a-delayed-job':
        this.processDelayedJob(job);
        break;
      case 'microservice-a-repeatable-job':
        this.processRepeatableJob(job);
        break;
      default:
        throw new Error(`Cannot handle job ${job.name}`);
    }
  }

  processDefaultJob(job: Job<any, any, string>) {
    return new Promise(() => {
      setTimeout(() => {
        return { status: 'completed' };
      }, 2000);
    });
  }

  processDelayedJob(job: Job<any, any, string>) {
    return { status: 'completed' };
  }

  processRepeatableJob(job: Job<any, any, string>) {
    return { status: 'completed' };
  }
}
