import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { Queue, Worker } from 'bullmq';
import { ioRedis } from '@gitroom/nestjs-libraries/redis/redis.service';

export class BullMqServer extends Server implements CustomTransportStrategy {
  queues: Map<string, Queue>;
  workers: Worker[] = [];

  /**
   * This method is triggered when you run "app.listen()".
   */
  listen(callback: () => void) {
    this.queues = [...this.messageHandlers.keys()].reduce((all, pattern) => {
      all.set(pattern, new Queue(pattern, { connection: ioRedis }));
      return all;
    }, new Map());

    // Workers disabled until platform launch
    // this.workers = Array.from(this.messageHandlers).map(
    //   ([pattern, handler]) => {
    //     return new Worker(
    //       pattern,
    //       async (job) => {
    //         const stream$ = this.transformToObservable(
    //           await handler(job.data.payload, job)
    //         );

    //         this.send(stream$, (packet) => {
    //           if (packet.err) {
    //             return job.discard();
    //           }

    //           return true;
    //         });
    //       },
    //       {
    //         maxStalledCount: 10,
    //         concurrency: parseInt(process.env.BULLMQ_CONCURRENCY || '5', 10),
    //         connection: ioRedis,
    //         removeOnComplete: {
    //           count: 100,
    //           age: 3600, // Remove completed jobs older than 1 hour
    //         },
    //         removeOnFail: {
    //           count: 50,
    //           age: 86400, // Remove failed jobs older than 24 hours
    //         },
    //       }
    //     );
    //   }
    // );
    this.workers = [];

    callback();
  }

  /**
   * This method is triggered on application shutdown.
   */
  close() {
    this.workers.map((worker) => worker.close());
    this.queues.forEach((queue) => queue.close());
    return true;
  }
}
