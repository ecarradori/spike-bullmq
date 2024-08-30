import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';

@QueueEventsListener('microservice-a')
export class MicroserviceAListener extends QueueEventsHost {
  @OnQueueEvent('completed')
  async onCompleted(job: { jobId: any; returnvalue: any }) {
    console.log(`Job ${job.jobId} completed`);
    console.log(JSON.stringify(job, null, 2));
  }
}
