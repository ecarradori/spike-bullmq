import {
  InjectQueue,
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';

@QueueEventsListener('microservice-a')
export class MicroserviceAListener extends QueueEventsHost {
  constructor(
    @InjectQueue('microservice-a') private readonly microserviceAQueue: Queue,
  ) {
    super();
  }

  @OnQueueEvent('completed')
  async onCompleted({ jobId }) {
    const job = await Job.fromId(this.microserviceAQueue, jobId);
    console.log(`Job ${jobId} completed`);
    console.log(JSON.stringify(job, null, 2));
  }
}
