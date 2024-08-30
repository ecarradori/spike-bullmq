# NestJS Microservices with BullMQ

This project demonstrates a microservices architecture using NestJS and BullMQ for job queue management.

## Prerequisites

- Node.js (v14 or later)
- Yarn
- Redis (or Docker running a Redis container)

## Setup

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Start a local Redis server on the default port (6379), or use Docker to run a Redis container:

   ```bash
   docker run --name redis -p 6379:6379 -d redis
   ```

   This command will start a Redis container named "redis" and map the container's port 6379 to the host's port 6379.

## Running the Microservices

1. Start Microservice A:

   ```bash
   yarn start:a
   ```

2. In a new terminal, start Microservice B:

   ```bash
   yarn start:b
   ```

## Testing the Job Queue

Use the following API endpoints to trigger example jobs in Microservice A:

1. Add a default job:

   ```bash
   curl -X POST http://localhost:3000/default-job
   ```

2. Add a not handled job:

   ```bash
   curl -X POST http://localhost:3000/not-handled-job
   ```

3. Add a delayed job:

   ```bash
   curl -X POST http://localhost:3000/delayed-job
   ```

4. Add a repeatable job:

   ```bash
   curl -X POST http://localhost:3000/repeatable-job
   ```

Alternatively, you can use the provided REST Client file to trigger these jobs. The file is located at [`rest-client.rest`](./rest-client.rest).  
To use this file, you'll need to install the "REST Client" extension for Visual Studio Code. Once installed, you can open the `rest-client.rest` file and use the "Send Request" link above each endpoint to easily trigger the jobs without leaving your editor.

## Monitoring Jobs

Microservice B will process the jobs added by Microservice A. You can monitor the job processing in the console output of Microservice B.

## Project Structure

- Microservice A (Producer): Adds jobs to the queue
  - Main file: [`apps/microservice-a/src/main.ts`](./apps/microservice-a/src/main.ts)
  - Controller: [`apps/microservice-a/src/microservice-a.controller.ts`](./apps/microservice-a/src/microservice-a.controller.ts)
  - Producer: [`apps/microservice-a/src/microservice-a.producer.ts`](./apps/microservice-a/src/microservice-a.producer.ts)
  - Listener: [`apps/microservice-a/src/microservice-a.listener.ts`](./apps/microservice-a/src/microservice-a.listener.ts)

- Microservice B (Consumer): Processes jobs from the queue
  - Main file: [`apps/microservice-b/src/main.ts`](./apps/microservice-b/src/main.ts)
  - Consumer: [`apps/microservice-b/src/microservice-b.consumer.ts`](./apps/microservice-b/src/microservice-b.consumer.ts)

## Configuration

Both microservices are configured to use the local Redis server. You can modify the connection settings in the respective module files if needed.

For more details on the NestJS framework and its features, please refer to the [NestJS documentation](https://docs.nestjs.com).