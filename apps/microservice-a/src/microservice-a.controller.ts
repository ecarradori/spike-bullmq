import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MicroserviceAProducer } from './microservice-a.producer';

@Controller()
export class MicroserviceAController {
  constructor(private readonly microserviceAProducer: MicroserviceAProducer) {}

  @Post('default-job')
  @HttpCode(HttpStatus.CREATED)
  async addDefaultJob(): Promise<void> {
    await this.microserviceAProducer.addDefaultJob();
  }

  @Post('not-handled-job')
  @HttpCode(HttpStatus.CREATED)
  async addNotHandledJob(): Promise<void> {
    await this.microserviceAProducer.addNotHandledJob();
  }

  @Post('delayed-job')
  @HttpCode(HttpStatus.CREATED)
  async addDelayedJob(): Promise<void> {
    await this.microserviceAProducer.addDelayedJob();
  }

  @Post('repeatable-job')
  @HttpCode(HttpStatus.CREATED)
  async addRepeatableJob(): Promise<void> {
    await this.microserviceAProducer.addRepeatableJob();
  }
}
